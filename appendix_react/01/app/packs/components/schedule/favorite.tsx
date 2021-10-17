import * as React from "react"
import { useDispatch } from "react-redux"
import {
  Concert,
  buttonClass,
  removeFavorite,
} from "contexts/schedule_context"

interface SearchResultProps {
  favorite: Concert
  animateIn: boolean
  shouldBeVisible: boolean
}

export const Favorite = ({
  favorite,
  animateIn,
  shouldBeVisible,
}: SearchResultProps): React.ReactElement => {
  const dispatch = useDispatch()
  const [animateOut, setAnimateOut] = React.useState(false)
  const [display, setDisplay] = React.useState(shouldBeVisible)

  React.useEffect(() => {
    if (!shouldBeVisible) {
      setAnimateOut(true)
    }
  })

  const removeFavoriteOnClick = (): void => {
    dispatch(removeFavorite(favorite))
  }

  const onAnimationEnd = () => {
    if (!shouldBeVisible) {
      setDisplay(false)
    }
  }

  return (
    display && (
      <section>
        <article
          className={`my-6
            ${animateIn ? "animate__animated animate__slideInRight" : ""}
            ${animateOut ? "animate__animated animate__slideOutRight" : ""}
          }`}
          onAnimationEnd={onAnimationEnd}>
          <div className="grid gap-4 grid-cols-5">
            <div className="col-span-1 text-xl">{favorite.startTime}</div>
            <div className="col-span-3">
              <div className="name">
                <div className="text-lg font-bold">
                  <a href={`/concert/${favorite.id}`}>{favorite.name}</a>
                </div>
              </div>
              <div className="bands">{favorite.bandNames}</div>
              <div className="genres">{favorite.genreTags}</div>
              <div className="text-gray-500 font-bold">
                {favorite.venueName}
              </div>
            </div>
            <div className="col-span-1 text-xl">
              <span data-concert-target="tickets"></span>
              <br />
              <br />
              <div className="flex">
                <button
                  className={buttonClass}
                  onClick={removeFavoriteOnClick}>
                  Remove Favorite
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    )
  )
}

export default Favorite
