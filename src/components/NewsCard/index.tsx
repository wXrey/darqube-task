import { ReactElement } from "react";
import arrowIcon from "../../assets/icons/arrow.svg";
import bookmarkIcon_unchecked from "../../assets/icons/bookmark_unchecked.svg";
import bookmarkIcon_checked from "../../assets/icons/bookmark_checked.svg";
import "./styles.css";
import {  NewsData } from "../../pages/NewsPage/slice";
import { useDispatch } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../pages/BookmarksPage/slice";

interface NewsCardProps {
  data: NewsData
  type: 'primary' | 'secondary'
  isFavorite: boolean;
}

function NewsCard({
  data,
  type,
  isFavorite,
}: NewsCardProps): ReactElement {
  const dispatch = useDispatch()
  const isPrimaryCard = type === "primary";

  const renderedDate = (
    <span className="card-date">
      {new Date(data.datetime).toLocaleDateString("en-UK", {
        day: "numeric",
        month: "short",
      })}
    </span>
  );

  const handleBookmarkClick = () => {
    isFavorite ? dispatch(removeFromFavorites(data.id)) : dispatch(addToFavorites(data))
  }

  const handleTitleClick=() => window.open(data.url, '_blank')

  return (
    <div className={`card-root card-${type}`}>
      <button className="card-weekly-brief">Weekly Brief</button>
      {isPrimaryCard && (
        <button className="card-latest-research">LATEST RESEARCH</button>
      )}
      <h2 className="card-title" onClick={handleTitleClick}>{data.headline}</h2>
      {
        <div className="card-read-research">
          {isPrimaryCard ? (
            <>
              <div className="card-read-research-icon">
                <img src={arrowIcon} />
              </div>
              <button>Read the research</button>
              <div className="vertical-line"></div>
              {renderedDate}
            </>
          ) : (
            renderedDate
          )}
        </div>
      }
      <img
        className="card-bookmark-icon"
        onClick={handleBookmarkClick}
        src={isFavorite ? bookmarkIcon_checked : bookmarkIcon_unchecked}
      />
      <img className="card-root-bg-img" src={data.image} />
    </div>
  );
}

export default NewsCard;
