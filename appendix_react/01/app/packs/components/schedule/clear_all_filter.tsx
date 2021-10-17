import * as React from "react"
import { useDispatch } from "react-redux"

export const ClearAllFilter = (): React.ReactElement => {
  const dispatch = useDispatch()

  const clearAllClick = (): void => {
    dispatch({ type: "clearFilters" })
  }

  return <div onClick={clearAllClick}>Show All</div>
}

export default ClearAllFilter
