import { Database } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"

// resources
import migrations from "@/models/migrations"
import schema from "@/models/schema"

import Category from "./category.model"
import Task from "./task.model"

// watermelon db
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: false /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.error(error)
    // Database failed to load -- offer the user to reload the app or log out
  },
})

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [Task, Category],
})
