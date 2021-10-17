import { Controller } from "stimulus"

export default class FavoriteToggleController extends Controller {
  toggle(): void {
    console.log("Click!")
  }
}
