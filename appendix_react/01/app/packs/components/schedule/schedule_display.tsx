import * as React from "react"
import { useSelector } from "react-redux"
import {
  ScheduleDay,
  ScheduleState,
  visibleDays,
} from "contexts/schedule_context"
import SingleDayDisplay from "components/schedule/single_day_display"

export const ScheduleDisplay = (): React.ReactElement => {
  const scheduleDays = useSelector<ScheduleState, ScheduleDay[]>((state) =>
    visibleDays(state)
  )
  return (
    <section>
      {scheduleDays.map((day, index) => (
        <SingleDayDisplay key={index} day={day} />
      ))}
    </section>
  )
}

export default ScheduleDisplay
