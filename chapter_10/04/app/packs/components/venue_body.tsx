import * as React from "react"
import Row from "components/row"
import { VenueData } from "components/venue"
import { Subscription } from "@rails/actioncable"

interface VenueBodyProps {
  concertId: number
  rowCount: number
  seatsPerRow: number
  ticketsToBuyCount: number
  venueData: VenueData
  subscription: Subscription
}

const rowItems = ({
  concertId,
  rowCount,
  seatsPerRow,
  ticketsToBuyCount,
  venueData,
  subscription,
}) => {
  const rowNumbers = Array.from(Array(rowCount).keys())
  return rowNumbers.map((rowNumber: number) => (
    <Row
      concertId={concertId}
      key={rowNumber}
      rowData={venueData[rowNumber]}
      rowNumber={rowNumber}
      seatsPerRow={seatsPerRow}
      ticketsToBuyCount={ticketsToBuyCount}
      subscription={subscription}
    />
  ))
}

export const VenueBody = (props: VenueBodyProps): React.ReactElement => {
  return (
    <table className="table">
      <tbody>{rowItems(props)}</tbody>
    </table>
  )
}

export default VenueBody
