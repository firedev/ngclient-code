/***
 * Excerpted from "Modern Front-End Development for Rails",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
***/
import "@hotwired/turbo-rails"
import "channels"
import "controllers"
import "core-js/stable"
import "regenerator-runtime/runtime"
import * as ActiveStorage from "@rails/activestorage"
import Rails from "@rails/ujs"

Rails.start()
ActiveStorage.start()
