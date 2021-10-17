import { Controller } from "stimulus"

export default class CssFlipController extends Controller {
  static classes = ["on", "off"]
  onClass: string
  offClass: string

  static targets = ["elementToChange"]
  elementToChangeTarget: HTMLElement

  static values = { status: Boolean }
  statusValue: boolean

  toggle(): void {
    this.flipState()
  }

  flipState(): void {
    this.statusValue = !this.statusValue
  }

  statusValueChanged(): void {
    this.updateCssClass()
  }

  updateCssClass(): void {
    for (const oneCssClass of this.onClass.split(" ")) {
      this.elementToChangeTarget.classList.toggle(
        oneCssClass,
        this.statusValue
      )
    }

    for (const oneCssClass of this.offClass.split(" ")) {
      this.elementToChangeTarget.classList.toggle(
        oneCssClass,
        !this.statusValue
      )
    }
  }
}
