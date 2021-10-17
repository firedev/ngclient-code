import * as React from "react"
import Row from "components/concerts/row"
import { useSelector } from "react-redux"
import { VenueState } from "contexts/venue_types"

const rowItems = (rowCount) => {
  const rowNumbers = Array.from(Array(rowCount).keys())
  return rowNumbers.map((rowNumber) => (
    <Row key={rowNumber + 1} rowNumber={rowNumber + 1} />
  ))
}

export const VenueBody = (): React.ReactElement => {
  const rowCount = useSelector<VenueState, number>(
    (state) => state.rowCount
  )
  return (
    <table className="table">
      <tbody>{rowItems(rowCount)}</tbody>
    </table>
  )
}

export default VenueBody
