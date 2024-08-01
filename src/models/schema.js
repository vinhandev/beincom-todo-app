import { appSchema, tableSchema } from "@nozbe/watermelondb"

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "lists",
      columns: [
        { name: "title", type: "string" },
        { name: "user_id", type: "string" },
      ],
    }),
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "is_completed", type: "boolean" },
        { name: "list_id", type: "string" },
      ],
    }),
  ],
})
