import type { CollectionConfig } from "payload";

const isAdmin = (req: any) => req.user?.role === "admin";

export const Families: CollectionConfig = {
  slug: "families",
  admin: {
    useAsTitle: "id",
  },
  access: {
    read: ({ req }) => {
      if (!req.user) return false;
      if (isAdmin(req)) return true;

      // chỉ cho đọc những family mà mình là member
      return {
        members: {
          contains: req.user.id,
        },
      };
    },
    create: ({ req }) => !!req.user, // user đã login mới tạo family
    update: ({ req }) => {
      if (!req.user) return false;
      if (isAdmin(req)) return true;
      return {
        members: { contains: req.user.id },
      };
    },
    delete: ({ req }) => isAdmin(req),
  },

  fields: [
    {
      name: "createdBy",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: { readOnly: true },
    },
    {
      name: "members",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
    },
  ],
};
