import './search.scss';

type searchPropTypes = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: () => void;
  onFocusChange: () => void;
};

const Search: React.FC<searchPropTypes> = ({ onChangeHandler, onBlurHandler, onFocusChange }) => {
  return (
    <div className="search">
      <input
        onBlur={onBlurHandler}
        onFocus={onFocusChange}
        className="search-input"
        onChange={onChangeHandler}
        placeholder="Find the items you are looking for"
      />
      <button className="search-button">🔎</button>
    </div>
  );
};

export default Search;
