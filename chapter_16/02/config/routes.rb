#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
Rails.application.routes.draw do
  resources(:favorites)
  resource(:schedule)
  resources(:shopping_carts)
  resources(:ticket_orders)
  resources(:tickets)
  resources(:gigs)
  resources(:concerts)
  resources(:bands)
  resources(:venues)
  resource(:sold_out_concerts, only: :show)
  devise_for(:users)
  root(to: "schedules#show")

  post("test/log_in_user", to: "test_setup#log_in_user")
  post("test/add_favorite", to: "test_setup#add_favorite")
end