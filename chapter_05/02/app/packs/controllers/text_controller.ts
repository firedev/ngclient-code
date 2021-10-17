import { Controller } from "stimulus"

export default class TextController extends Controller {
  static targets = ["elementWithText"]
  elementWithTextTarget: HTMLElement

  static values = { status: Boolean, on: String, off: String }
  offValue: string
  onValue: string
  statusValue: boolean

  toggle(): void {
    this.flipState()
  }

  flipState(): void {
    this.statusValue = !this.statusValue
  }

  statusValueChanged(): void {
    this.updateText()
  }

  newText(): string {
    return this.statusValue ? this.onValue : this.offValue
  }

  updateText(): void {
    this.elementWithTextTarget.innerText = this.newText()
  }
}
