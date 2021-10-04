import { ChangeEvent, ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setFilteredData } from "../../pages/NewsPage/slice";
import Search from "../Search";
import "./styles.css";

interface NavBarProps {
  pages: string[];
}

function NavBar({ pages }: NavBarProps): ReactElement {
  const [searchValue, setSearchValue] = useState<string>("");
  const history = useHistory();
  const dispatch  = useDispatch()

  const handlePageClick = (page: string): void => {
    history.push(`/${page}`);
  };

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    window.location.pathname.toLowerCase().includes('news') ? dispatch(setFilteredData(searchValue)) : setFilteredData('')
  };

  return (
    <div className="navbar-root">
      <div className="navbar-pages">
        {pages.map((page, id) => (
          <span key={id} onClick={()=>handlePageClick(page)}>
            {page}
          </span>
        ))}
      </div>
      <Search
        value={searchValue}
        placeholder="Search"
        onChange={onChangeSearchValue}
      />
    </div>
  );
}

export default NavBar;
