import type { CollectionConfig } from "payload";

export const FamilyInvites: CollectionConfig = {
  slug: "familyInvites",
  admin: { useAsTitle: "code" },
  access: {
    read: ({ req }) => !!req.user,     // tối thiểu: login mới đọc
    create: ({ req }) => !!req.user,   // login mới tạo
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "code",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "family",
      type: "relationship",
      relationTo: "families",
      required: true,
    },
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "expiresAt",
      type: "date",
    },
    {
      name: "usedBy",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "usedAt",
      type: "date",
    },
  ],
};
