import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "parent",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Parent", value: "parent" },
      ],
    },

    { name: "firstName", type: "text", required: true },
    { name: "lastName", type: "text", required: true },
    { name: "birthDate", type: "date", required: true },
    { name: "phone", type: "text", required: true },
    { name: "address", type: "text", required: true },

    {
      name: "gender",
      type: "select",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
    },

    {
      name: "familyRole",
      type: "select",
      required: true,
      options: [
        { label: "Mother", value: "mother" },
        { label: "Father", value: "father" },
        { label: "Sibling", value: "sibling" },
        { label: "Other", value: "other" },
      ],
    },
  ],
};
