import * as React from "react"
import * as ReactDOM from "react-dom"
import Venue from "components/venue"

document.addEventListener("turbo:load", () => {
  const element = document.getElementById("react-element")
  if (element) {
    ReactDOM.render(
      <Venue
        rowCount={parseInt(element.dataset.rowCount, 10)}
        seatsPerRow={parseInt(element.dataset.seatsPerRow, 10)}
        concertId={parseInt(element.dataset.concertId, 10)}
      />,
      document.getElementById("react-element")
    )
  }
})
