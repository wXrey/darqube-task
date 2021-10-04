import { ChangeEvent, ReactElement } from "react";
import searchIcon from "../../assets/icons/search.svg";
import "./styles.css";

interface SearchProps {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Search({ value, placeholder, onChange }: SearchProps): ReactElement {
  return (
    <div className='search-root'>
      <input value={value} placeholder={placeholder} onChange={onChange} />
      <img src={searchIcon} />
    </div>
  );
}

export default Search;
