import type { CollectionConfig } from 'payload'
import { headersWithCors } from 'payload'
import crypto from 'crypto'

function cors(req: any) {
  return headersWithCors({
    headers: new Headers(),
    req,
  })
}

function generateInviteCode(len = 10) {
  return crypto.randomBytes(32).toString('hex').slice(0, len).toUpperCase()
}

function getUserId(req: any) {
  if (!req?.user) return null
  return req.user.id ?? (req.user as any)?._id ?? null
}

export const Families: CollectionConfig = {
  slug: 'families',

  access: {
    create: ({ req }) => !!req.user,

    read: ({ req }) => {
      if (!req.user) return false
      return { members: { in: [req.user.id] } }
    },

    update: ({ req }) => {
      if (!req.user) return false
      return { members: { in: [req.user.id] } }
    },

    delete: () => false,
  },

  endpoints: [
    {
      path: '/join',
      method: 'post',
      handler: async (req: any) => {
        if (!req.user) {
          return Response.json({ message: 'Unauthorized' }, { status: 401, headers: cors(req) })
        }

        const body = await req.json().catch(() => ({} as any))
        const code = String(body?.code || '').trim().toUpperCase()

        if (!code) {
          return Response.json({ message: 'Missing invite code' }, { status: 400, headers: cors(req) })
        }

        const found = await req.payload.find({
          collection: 'families',
          where: { inviteCode: { equals: code } },
          limit: 1,
          overrideAccess: true,
        })

        const family = found.docs?.[0]
        if (!family) {
          return Response.json({ message: 'Invalid invite code' }, { status: 404, headers: cors(req) })
        }

        const currentMembers: any[] = Array.isArray((family as any).members)
          ? (family as any).members
              .map((m: any) => (typeof m === 'object' ? m?.id : m))
              .filter((v: any) => v != null)
          : []

        const userId = getUserId(req)
        if (userId == null) {
          return Response.json({ message: 'Unauthorized' }, { status: 401, headers: cors(req) })
        }

        const exists = currentMembers.some((m) => String(m) === String(userId))
        const updatedMembers = exists ? currentMembers : [...currentMembers, userId]

        await req.payload.update({
          collection: 'families',
          id: family.id,
          data: { members: updatedMembers },
          overrideAccess: true,
        })

        // ✅ update đúng collection: customers
        await req.payload.update({
          collection: 'customers',
          id: userId,
          data: { family: family.id } as any,
          overrideAccess: true,
        })

        return Response.json({ ok: true, familyId: family.id }, { status: 200, headers: cors(req) })
      },
    },
  ],

  hooks: {
    beforeValidate: [
      ({ data }) => {
        const nextData: any = { ...(data ?? {}) }
        if (!nextData.inviteCode) nextData.inviteCode = generateInviteCode(10)
        return nextData
      },
    ],

    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create') return
        const userId = getUserId(req)
        if (userId == null) return

        try {
          // ✅ update đúng collection: customers
          await req.payload.update({
            collection: 'customers',
            id: userId,
            data: { family: doc.id } as any,
            overrideAccess: true,
          })
        } catch (e) {
          req.payload.logger?.error?.(e)
        }
      },
    ],
  },

  fields: [
    { name: 'name', label: 'Family name', type: 'text' },
    {
      name: 'inviteCode',
      label: 'Invite code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'members',
      label: 'Members',
      type: 'relationship',
      relationTo: 'customers', // ✅ đổi users -> customers
      hasMany: true,
      required: true,
    },
  ],
}
