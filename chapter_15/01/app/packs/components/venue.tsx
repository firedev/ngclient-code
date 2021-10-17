import * as React from "react"
import Subtotal from "components/subtotal"
import VenueBody from "components/venue_body"
import VenueHeader from "components/venue_header"

export const Venue = (): React.ReactElement => {
  return (
    <>
      <Subtotal />
      <VenueHeader />
      <VenueBody />
    </>
  )
}

export default Venue
