import * as React from "react"
import CalendarFilter from "components/schedule/calendar_filter"
import TextFilter from "components/schedule/text_filter"

export const Filter = (): React.ReactElement => {
  return (
    <section>
      <CalendarFilter />
      <TextFilter />
    </section>
  )
}

export default Filter
