import * as React from "react"
import Seat from "components/seat"
import { useSelector } from "react-redux"
import { VenueState } from "contexts/venue_types"

interface RowProps {
  rowNumber: number
}

const Row = ({ rowNumber }: RowProps): React.ReactElement => {
  const seatsPerRow = useSelector<VenueState, number>(
    (state) => state.seatsPerRow
  )

  const seatItems = Array.from(Array(seatsPerRow).keys()).map(
    (seatNumber) => {
      return (
        <Seat
          key={seatNumber + 1}
          seatNumber={seatNumber + 1}
          rowNumber={rowNumber}
        />
      )
    }
  )

  return <tr className="h-20">{seatItems}</tr>
}

export default Row
