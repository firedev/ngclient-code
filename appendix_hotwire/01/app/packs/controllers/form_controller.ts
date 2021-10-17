import { Controller } from "stimulus"
import "form-request-submit-polyfill"

export default class SearchController extends Controller {
  static targets = ["form"]
  formTarget: HTMLFormElement

  submit(): void {
    this.formTarget.requestSubmit()
  }
}
