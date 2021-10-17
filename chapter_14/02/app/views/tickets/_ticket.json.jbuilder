json.extract!(ticket, :id, :concert_id, :row, :number, :user_id, :status, :created_at, :updated_at)
json.url(ticket_url(ticket, format: :json))
