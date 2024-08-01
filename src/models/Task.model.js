import { Model } from "@nozbe/watermelondb"
import {field , text} from "@nozbe/watermelondb/decorators"
export default class Task extends Model {
  static table = "tasks"

  static associations = {
    list: { type: "belongs_to", key: "list_id" },
  }

  @text("title") title
  @field("is_completed") is_completed 
}
