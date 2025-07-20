import { SEARCH_PLACEHOLDER } from '../../constants';
import './search.scss';

type searchPropTypes = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: () => void;
  onFocusChange: () => void;
  searchTerm: string;
};

const Search: React.FC<searchPropTypes> = ({
  onChangeHandler,
  onBlurHandler,
  onFocusChange,
  searchTerm,
}) => {
  return (
    <div className="search">
      <input
        onBlur={onBlurHandler}
        onFocus={onFocusChange}
        className="search-input"
        onChange={onChangeHandler}
        value={searchTerm}
        placeholder={SEARCH_PLACEHOLDER}
      />
      <button className="search-button">🔎</button>
    </div>
  );
};

export default Search;
