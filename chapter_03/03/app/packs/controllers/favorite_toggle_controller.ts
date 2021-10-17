import { Controller } from "stimulus"

export default class FavoriteToggleController extends Controller {
  static targets = ["elementToHide"]

  elementToHideTarget: HTMLElement

  toggle(): void {
    this.elementToHideTarget.classList.toggle("hidden")
  }
}
