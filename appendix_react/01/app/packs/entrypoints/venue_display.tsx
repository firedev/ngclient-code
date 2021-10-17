import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "components/app"
import ScheduleApp from "components/schedule_app"

document.addEventListener("turbo:load", () => {
  const element = document.getElementById("react-element")
  if (element) {
    ReactDOM.render(
      <App
        rowCount={parseInt(element.dataset.rowCount || "0", 10)}
        seatsPerRow={parseInt(element.dataset.seatsPerRow || "0", 10)}
        concertId={parseInt(element.dataset.concertId || "0", 10)}
      />,
      element
    )
  }

  const schedule_element = document.getElementById("schedule-react-element")
  if (schedule_element) {
    ReactDOM.render(
      <ScheduleApp
        favoriteChannelName={schedule_element.dataset.favoriteChannelName}
      />,
      schedule_element
    )
  }
})
