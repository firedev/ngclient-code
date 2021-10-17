import { Controller } from "stimulus"
import { createConsumer, Channel } from "@rails/actioncable"

interface ConcertRemainingData {
  concertId: number
  ticketsRemaining: number
}

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
      received({ concerts }) {
        source.updateData(concerts)
      },
    })
  }

  updateData(concerts: ConcertRemainingData[]): void {
    concerts.forEach(({ concertId, ticketsRemaining }) => {
      this.concertTargets.forEach((e) => {
        if (e.dataset.concertIdValue === concertId.toString()) {
          e.dataset.concertTicketsRemainingValue = ticketsRemaining.toString()
          e.dataset.concertSoldOutValue = (
            ticketsRemaining === 0
          ).toString()
        }
      })
    })
  }
}
