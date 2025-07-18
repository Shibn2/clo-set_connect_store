import "./search.scss";

type searchPropTypes = {
    onChangeHandler: () => void
    onBlurHandler: () => void
    onFocusChange: () => void
}

const Search:React.FC<searchPropTypes> = ({ onChangeHandler, onBlurHandler, onFocusChange }) => {
    return <div className="search">
        <input onBlur={onBlurHandler} onFocus={onFocusChange} className="search-input" onChange={onChangeHandler}/>
        <button className="search-button">🔎</button>
    </div>
}

export default Search;