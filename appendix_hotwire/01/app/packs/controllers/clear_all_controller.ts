import { Controller } from "stimulus"
import "form-request-submit-polyfill"

export default class FormController extends Controller {
  static targets = ["form", "hiddenField"]
  formTarget: HTMLFormElement
  hiddenFieldTarget: HTMLFormElement

  static values = { hiddenId: String }
  hiddenIdValue: string

  submit(): void {
    const hiddenValueElement = document.getElementById(
      this.hiddenIdValue
    ) as HTMLFormElement
    if (hiddenValueElement) {
      this.hiddenFieldTarget.value = hiddenValueElement.value
    }
    this.formTarget.requestSubmit()
  }
}
