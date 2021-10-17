import { VenueState, VenueAction } from "contexts/venue_types"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { ThunkAction, ThunkMiddleware } from "redux-thunk"
import { createConsumer } from "@rails/actioncable"

export const initialState = {
  rowCount: 1,
  seatsPerRow: 1,
  concertId: 0,
  otherTickets: [],
  ticketsToBuyCount: 1,
  myTickets: [],
  subscription: null,
}

type VenueThunk = ThunkAction<void, VenueState, null, VenueAction>

export const initSubscription = (): VenueThunk => {
  return (dispatch, getState) => {
    if (getState().subscription) {
      return
    }
    const subscription = createConsumer().subscriptions.create(
      { channel: "ConcertChannel", concertId: getState().concertId },
      {
        received(tickets) {
          dispatch({ type: "setTickets", tickets })
        },
      }
    )
    dispatch({ type: "setSubscription", subscription })
  }
}

export const fetchData = (): VenueThunk => {
  return async (dispatch, getState) => {
    const response = await fetch(
      `/tickets.json?concert_id=${getState().concertId}`
    )
    const tickets = await response.json()
    dispatch({ type: "setTickets", tickets })
  }
}

export const seatChange = (
  status: string,
  rowNumber: number,
  seatNumber: number
): VenueThunk => {
  return async (dispatch, getState) => {
    const actionType = status === "unsold" ? "holdTicket" : "unholdTicket"
    await getState().subscription.perform("added_to_cart", {
      concertId: getState().concertId,
      row: rowNumber,
      seatNumber: seatNumber,
      status: actionType === "holdTicket" ? "held" : "unsold",
      ticketsToBuyCount: getState().ticketsToBuyCount,
    })
    dispatch({ type: actionType, seatNumber, rowNumber })
  }
}

export const clearCart = (): VenueThunk => {
  return async (dispatch, getState) => {
    await getState().subscription.perform("removed_from_cart", {
      concertId: getState().concertId,
      tickets: getState().myTickets,
    })
    dispatch({ type: "clearHolds" })
  }
}

export const venueReducer = (
  state: VenueState = initialState,
  action: VenueAction
): VenueState => {
  switch (action.type) {
    case "setTickets":
      return {
        ...state,
        otherTickets: action.tickets.filter(
          (ticket) => ticket.status === "purchased"
        ),
        myTickets: action.tickets.filter(
          (ticket) => ticket.status === "held"
        ),
      }
    case "setTicketsToBuy":
      return { ...state, ticketsToBuyCount: action.amount }
    case "holdTicket": {
      const newTickets = Array.from(
        Array(state.ticketsToBuyCount).keys()
      ).map((index) => {
        return {
          id: 0,
          row: action.rowNumber,
          number: action.seatNumber + index,
          status: "held",
        }
      })
      return {
        ...state,
        myTickets: [...state.myTickets, ...newTickets],
      }
    }
    case "unholdTicket": {
      const newTickets = state.myTickets.filter((ticket) => {
        const rowMatch = ticket.row == action.rowNumber
        const seatDiff = ticket.number - action.seatNumber
        const seatMatch =
          seatDiff >= 0 && seatDiff < state.ticketsToBuyCount
        return !(rowMatch && seatMatch)
      })
      return { ...state, myTickets: newTickets }
    }
    case "clearHolds": {
      return { ...state, myTickets: [] }
    }
    case "initFromProps": {
      return {
        ...state,
        concertId: action.props.concertId,
        rowCount: action.props.rowCount,
        seatsPerRow: action.props.seatsPerRow,
      }
    }
    case "setSubscription": {
      return { ...state, subscription: action.subscription }
    }
    default:
      return state
  }
}

export const venueStore = createStore(
  venueReducer,
  applyMiddleware(thunk as ThunkMiddleware<VenueState, VenueAction>)
)
