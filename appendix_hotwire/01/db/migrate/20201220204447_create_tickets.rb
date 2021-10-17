#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
class CreateTickets < ActiveRecord::Migration[6.1]
  def change
    create_enum(:enum_status, %w[unsold held purchased refunded])

    create_table(:tickets) do |t|
      t.references(:concert, null: false, foreign_key: true)
      t.integer(:row)
      t.integer(:number)
      t.references(:user, null: true, foreign_key: true)
      t.enum(:status, enum_name: :enum_status)
      t.references(:ticket_order)
      t.timestamps
    end
  end
end
