import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsCard } from "../../components";
import Pagination from "../../components/Pagination";
import { RootState } from "../../redux/store";
import { getNewsData } from "./api";
import { setNextPage, setPreviousPage } from "./slice";
import "./styles.css";

function NewsPage() {
  const dispatch = useDispatch();
  const {
    data,
    filteredData,
    shouldDisplayFilteredData,
    error,
    isLoading,
    pagination,
  } = useSelector((state: RootState) => state.newsPage);

  const { favorites } = useSelector((state: RootState) => state.bookmarksPage);

  useEffect(() => {
    dispatch(getNewsData());
  }, []);

  if (error) {
    return (
      <div>
        <h2>An error occured</h2>
        <h4>{error}</h4>
      </div>
    );
  }

  if (isLoading) {
    return <div style={{ marginLeft: 30 }}>loading...</div>;
  }

  const firstItem = data.length ? data[0] : null;
  const newsToDisplay = shouldDisplayFilteredData
    ? filteredData.slice(
        pagination.currentPage * 6,
        pagination.currentPage * 6 + 6
      )
    : data.slice(
        pagination.currentPage * 6 + 1,
        pagination.currentPage * 6 + 7
      );
  const shouldDisplayPagination = !!data.length;
  const firstItemIsFavorite = favorites.find(
    (item) => item.id === firstItem?.id
  );

  const handleNextPage = () => dispatch(setNextPage());
  const handlePrevPage = () => dispatch(setPreviousPage());

  return (
    <div className="news-page">
      <div className="main-news">
        {firstItem && (
          <NewsCard
            type="primary"
            data={firstItem}
            isFavorite={!!firstItemIsFavorite}
          />
        )}
      </div>

      <div className="secondary-news">
        {newsToDisplay.map((item) => {
          const isFavorite = favorites.find((fav) => fav.id === item.id);

          return (
            <NewsCard
              key={item.id}
              type="secondary"
              data={item}
              isFavorite={!!isFavorite}
            />
          );
        })}
      </div>

      {shouldDisplayPagination && (
        <div className="news-pagination">
          <Pagination
            itemsPerPage={6}
            currentPage={pagination.currentPage}
            totalItems={
              shouldDisplayFilteredData
                ? filteredData.length
                : pagination.totalItems
            }
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      )}
    </div>
  );
}

export default NewsPage;
