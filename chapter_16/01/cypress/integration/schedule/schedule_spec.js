/***
 * Excerpted from "Modern Front-End Development for Rails",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/nrclient for more book information.
***/
describe("On the schedule page", function () {
  beforeEach(function () {
    cy.request("/cypress_rails_reset_state")
  })

  it("Allows the user to create a favorite", () => {
    cy.visit("/users/sign_in")
    cy.get('[name="user[email]"]').type("areader@example.com")
    cy.get('[name="user[password]"]').type("awesome")
    cy.get('[name="commit"]').contains("Log in").click()
    cy.visit("/")
    cy.get("#favorite-concerts-list").as("favorites")
    cy.get(".concert").first().as("concert")
    cy.get("@concert").find(".button_to").find("input").first().click()
    cy.get("@favorites").find("article").should("have.lengthOf", 1)
    cy.get("@favorites").find(".name").first().should("contain", "Brandi")
    cy.get("@concert").contains("Remove Favorite")
  })

  it("Allows the user to remove a favorite", () => {
    cy.request("POST", "/test/log_in_user")
    cy.request("POST", "test/add_favorite")
    cy.visit("/")
    cy.get("#favorite-concerts-list").as("favorites")
    cy.get(".concert").first().as("concert")
    cy.get("@favorites").contains("Remove Favorite").first().click()
    cy.get("@favorites").find("article").should("have.lengthOf", 0)
    cy.get("@concert").contains("Make Favorite")
  })
})
