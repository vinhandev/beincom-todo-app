import { Model } from "@nozbe/watermelondb"
import {field , text} from "@nozbe/watermelondb/decorators"
export default class List extends Model {
  static table = "lists"

  static associations = {}

  @text("title") title
  @field("user_id") user_id
}
