#---
# Excerpted from "Modern Front-End Development for Rails",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
#---
["all", Rails.env].each do |seed|
  seed_file = Rails.root.join("db", "seeds", "#{seed}.rb")

  if File.exist?(seed_file)
    require seed_file

  end
end
