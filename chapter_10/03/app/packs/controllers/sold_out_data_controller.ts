import { Controller } from "stimulus"
import { createConsumer, Channel } from "@rails/actioncable"

export default class SoldOutDataController extends Controller {
  static targets = ["concert"]
  concertTargets: Array<HTMLElement>
  channel: Channel
  started: boolean

  connect(): void {
    if (this.channel) {
      return
    }
    this.started = true
    this.channel = this.createChannel(this)
  }

  createChannel(source: SoldOutDataController): Channel {
    return createConsumer().subscriptions.create("ScheduleChannel", {
      received({ soldOutConcertIds }) {
        source.updateData(soldOutConcertIds)
      },
    })
  }

  updateData(soldOutConcertIds: number[]): void {
    this.concertTargets.forEach((concertElement: HTMLElement) => {
      concertElement.dataset.concertSoldOutValue = soldOutConcertIds
        .includes(parseInt(concertElement.dataset.concertIdValue, 10))
        .toString()
    })
  }
}
