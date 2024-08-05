import { Model } from "@nozbe/watermelondb"
import {children, field } from "@nozbe/watermelondb/decorators"
export default class Category extends Model {
  static table = "categories"

  static associations = {
    tasks: { type: "has_many", foreignKey: "category_id" },
  }

  @field("title") title
  @field("user_id") user_id
  @children("tasks") tasks
}
