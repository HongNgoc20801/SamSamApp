import type { CollectionConfig } from 'payload'
function isAdmin(req: any) {
  // Payload multi-auth thường có req.user.collection hoặc req.user?._collection
  const c = req?.user?.collection ?? req?.user?._collection
  return c === 'users'
}

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: true
,
  admin: { useAsTitle: 'email' },

 access: {
    // Public register
    create: () => true,

    // Admin thấy tất cả, customer chỉ thấy chính mình
    read: ({ req }) => {
      if (!req.user) return false
      if (isAdmin(req)) return true
      return { id: { equals: req.user.id } }
    },

    update: ({ req }) => {
      if (!req.user) return false
      if (isAdmin(req)) return true
      return { id: { equals: req.user.id } }
    },

    delete: ({ req }) => {
      if (!req.user) return false
      if (isAdmin(req)) return true
      return { id: { equals: req.user.id } }
    },
  },

  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'birthDate',
      type: 'date',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      required: true,
      options: [
        { label: 'Mann', value: 'male' },
        { label: 'Kvinne', value: 'female' },
        { label: 'Annet', value: 'other' },
      ],
    },
    {
      name: 'familyRole',
      type: 'select',
      required: true,
      options: [
        { label: 'Far', value: 'father' },
        { label: 'Mor', value: 'mother' },
        { label: 'Søsken', value: 'sibling' },
        { label: 'Annet', value: 'other' },
      ],
    },

    // nếu bạn dùng family:
    {
      name: 'family',
      type: 'relationship',
      relationTo: 'families',
    },
  ],
}
