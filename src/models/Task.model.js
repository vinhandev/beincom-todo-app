import { Model } from "@nozbe/watermelondb"
import {field , relation, text} from "@nozbe/watermelondb/decorators"
export default class Task extends Model {
  static table = "tasks"

  static associations = {
    categories: { type: "belongs_to", key: "category_id" },
  }

  @field("title") title
  @field("is_completed") is_completed
  @field("created_at") created_at
  @relation("categories", "category_id") category
}
