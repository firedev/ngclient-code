#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class CreateShoppingCarts < ActiveRecord::Migration[6.1]
  def change
    create_table(:shopping_carts) do |t|
      t.references(:user, null: false, foreign_key: true)

      t.timestamps
    end
  end
end
