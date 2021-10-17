import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "components/app"

document.addEventListener("turbo:load", () => {
  const element = document.getElementById("react-element")
  if (element) {
    ReactDOM.render(
      <App
        rowCount={parseInt(element.dataset.rowCount, 10)}
        seatsPerRow={parseInt(element.dataset.seatsPerRow, 10)}
        concertId={parseInt(element.dataset.concertId, 10)}
      />,
      element
    )
  }
})
