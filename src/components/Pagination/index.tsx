import { ReactElement } from "react";
import "./styles.css";

interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

function Pagination({
  itemsPerPage,
  currentPage,
  totalItems,
  handleNextPage,
  handlePrevPage,
}: PaginationProps): ReactElement {
  return (
    <div className="pagination-root">
      <div className="pagination-items-info">
        {currentPage * itemsPerPage + 1}-
        {currentPage * itemsPerPage + itemsPerPage}{" "}
        <span>out of {totalItems}</span>
      </div>
      <div className="pagination-action-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          PREVIOUS
        </button>
        <button
          onClick={handleNextPage}
          disabled={totalItems <= (currentPage + 1) * itemsPerPage}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

export default Pagination;
