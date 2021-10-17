import * as React from "react"
import ScheduleFilter from "components/schedule/filter"
import ScheduleDisplay from "components/schedule/schedule_display"
import ScheduleFavorites from "components/schedule/favorites"
import {
  fetchData,
  scheduleStore,
  initScheduleChannel,
  initFavoritesChannel,
} from "contexts/schedule_context"
import { Provider } from "react-redux"

interface ScheduleAppProps {
  favoriteChannelName: string
}

export const ScheduleApp = ({
  favoriteChannelName,
}: ScheduleAppProps): React.ReactElement => {
  const store = scheduleStore
  store.dispatch({ type: "initEmpty" })
  store.dispatch(initScheduleChannel())
  store.dispatch(initFavoritesChannel(favoriteChannelName))
  store.dispatch(fetchData())
  return (
    <Provider store={store}>
      <section>
        <ScheduleFilter />
        <ScheduleFavorites />
        <ScheduleDisplay />
      </section>
    </Provider>
  )
}
export default ScheduleApp
