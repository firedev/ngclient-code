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

  describe("Favorites", () => {
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

  describe("calendar filters", () => {
    beforeEach(() => {
      cy.visit("/")
      cy.get("#calendar-day-2021-04-11").first().as("dayOne")
      cy.get("#calendar-day-2021-04-12").first().as("dayTwo")
      cy.get("#calendar-day-2021-04-13").first().as("dayThree")
      cy.get("[data-2021-04-11=true]").as("dayOneConcerts")
      cy.get("[data-2021-04-12=true]").as("dayTwoConcerts")
      cy.get("[data-2021-04-13=true]").as("dayThreeConcerts")
    })

    it("makes everybody visible with no clicks", () => {
      cy.get("@dayOneConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
      cy.get("@dayTwoConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
      cy.get("@dayThreeConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
    })

    it("shows only that day on calendar click", () => {
      cy.get("@dayOne").click()
      cy.get("@dayOne").should("have.class", "border-red-700")
      cy.get("@dayOneConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
      cy.get("@dayTwoConcerts").each((item) => {
        cy.wrap(item).should("not.be.visible")
      })
      cy.get("@dayThreeConcerts").each((item) => {
        cy.wrap(item).should("not.be.visible")
      })
    })

    it("shows all on show all", () => {
      cy.get("@dayOne").click()
      cy.get("@dayTwo").click()
      cy.contains("Show All").click()
      cy.get("@dayOne").should("not.have.class", "border-red-700")
      cy.get("@dayTwo").should("not.have.class", "border-red-700")
      cy.get("@dayOneConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
      cy.get("@dayTwoConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
      cy.get("@dayThreeConcerts").each((item) => {
        cy.wrap(item).should("be.visible")
      })
    })
  })

  describe("search", () => {
    beforeEach(() => {
      cy.visit("/")
    })

    it("updates on search typing", function () {
      cy.get("#search_query").type("billy")
      cy.get("#search-results").as("searchResults")
      cy.get("@searchResults").find("article").should("have.lengthOf", 1)
      cy.get("@searchResults")
        .find(".name")
        .first()
        .should("contain", "Billy")
    })
  })
})
