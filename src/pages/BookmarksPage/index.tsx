import { useDispatch, useSelector } from "react-redux";
import { NewsCard } from "../../components";
import Pagination from "../../components/Pagination";
import { RootState } from "../../redux/store";
import { setNextPage, setPreviousPage } from "./slice";
import "./styles.css";

function BookmarksPage() {
  const dispatch = useDispatch();
  const { favorites, pagination } = useSelector(
    (state: RootState) => state.bookmarksPage
  );

  const newsToDisplay = favorites.slice(
    pagination.currentPage * 6,
    pagination.currentPage * 6 + 6
  );
  const shouldDisplayPagination = !!favorites.length;

  if (!favorites.length) {
    return <div style={{ marginLeft: 30 }}>No favorite items..</div>;
  }

  const handleNextPage = () => dispatch(setNextPage());
  const handlePrevPage = () => dispatch(setPreviousPage());

  return (
    <div className="bookmarks-page">
      <div className="secondary-news">
        {newsToDisplay.map((item) => (
          <NewsCard key={item.id} type="secondary" data={item} isFavorite />
        ))}
      </div>

      {shouldDisplayPagination && (
        <div className="bookmarks-pagination">
          <Pagination
            itemsPerPage={6}
            currentPage={pagination.currentPage}
            totalItems={pagination.totalItems}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
