import * as React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { VenueState } from "contexts/venue_types"

const Header = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 15px;
  margin-right: 15px;
`

const options = (seatsPerRow) => {
  const arrayOfNumbers = Array.from(Array(seatsPerRow).keys())
  return arrayOfNumbers.map((i) => (
    <option key={i + 1} value={i + 1}>
      {i + 1}
    </option>
  ))
}

export const VenueHeader = (): React.ReactElement => {
  const seatsPerRow = useSelector<VenueState, number>(
    (state) => state.seatsPerRow
  )
  const dispatch = useDispatch()
  const setTicketsOnChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLSelectElement
    dispatch({
      type: "setTicketsToBuy",
      amount: parseInt(target.value, 10),
    })
  }

  return (
    <div>
      <Header>How many tickets would you like?</Header>
      <span className="select">
        <select onChange={setTicketsOnChange} data-cy="ticketsToBuy">
          {options(seatsPerRow)}
        </select>
      </span>
    </div>
  )
}

export default VenueHeader
