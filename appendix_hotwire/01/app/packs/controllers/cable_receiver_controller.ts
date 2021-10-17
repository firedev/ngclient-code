import { Controller } from "stimulus"
import { createConsumer, Channel } from "@rails/actioncable"

interface SeatChangedData {
  seat: string
  status: string
}

export default class CableReceiverController extends Controller {
  static values = { channelName: String, concertId: Number }
  channelNameValue: string
  concertIdValue: number

  static targets = ["form"]
  formTarget: HTMLFormElement

  channel: Channel

  connect(): void {
    if (this.channel) {
      return
    }
    this.channel = this.createChannel(this)
  }

  createChannel(source: CableReceiverController): Channel {
    return createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: this.concertIdValue },
      {
        received(data: SeatChangedData) {
          source.seatUpdated(data)
        },
      }
    )
  }

  seatUpdated(data: SeatChangedData): void {
    const seatElement = document.getElementById(data.seat)
    if (!seatElement || seatElement.dataset.status !== data.status) {
      this.formTarget.requestSubmit()
    }
  }
}
