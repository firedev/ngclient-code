import * as React from "react"
import Subtotal from "components/concerts/subtotal"
import VenueBody from "components/concerts/venue_body"
import VenueHeader from "components/concerts/venue_header"

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
