import { Model } from "@nozbe/watermelondb"
import {field , relation, text} from "@nozbe/watermelondb/decorators"
export default class Task extends Model {
  static table = "tasks"

  static associations = {
    categories: { type: "belongs_to", key: "category_id" },
  }

  @field("title") title
  @field("is_completed") is_completed
  @relation("categories", "category_id") category
}
