#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class ConcertChannel < ApplicationCable::Channel
  def subscribed
    stream_from("concert_#{params[:concertId]}")
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def added_to_cart(data)
    cart = ShoppingCart.find_or_create_by(user_id: data["userId"])
    cart.add_tickets(
      concert_id: data["concertId"],
      row: data["row"],
      seat_number: data["seatNumber"],
      tickets_to_buy_count: data["ticketsToBuyCount"],
      status: data["status"]
    )
    result = Ticket.data_for_concert(data["concertId"])
    ActionCable.server.broadcast("concert_#{data["concertId"]}", result)
    concert = Concert.find(data["concertId"])
    ActionCable.server.broadcast(
      "schedule",
      {
        concerts: [
          {
            concertId: data["concertId"],
            ticketsRemaining: concert.tickets.unsold.count
          }
        ]
      }
    )
  end

  def removed_from_cart(data)
    cart = ShoppingCart.find_or_create_by(user_id: data["userId"])
    cart.clear(
      concert_id: data["concertId"],
      tickets: data["tickets"]
    )
    result = Ticket.data_for_concert(data["concertId"])
    ActionCable.server.broadcast("concert_#{data["concertId"]}", result)
  end
endå
