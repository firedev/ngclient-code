import * as React from "react"
import SearchForm from "components/schedule/search_form"
import SearchResults from "components/schedule/search_results"

export const TextFilter = (): React.ReactElement => {
  return (
    <div>
      <SearchForm />
      <SearchResults />
    </div>
  )
}

export default TextFilter
