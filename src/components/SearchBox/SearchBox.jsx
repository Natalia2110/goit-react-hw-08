import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);

  const handleFilter = (event) => {
    const value = event.target.value;
    dispatch(changeFilter(value));
  };
  return (
    <div className={css["search-box"]}>
      <h2 className={css.title}>Find contacts by name</h2>
      <input
        className={css["search-input"]}
        type="text"
        value={filterValue}
        onChange={handleFilter}
        placeholder="Enter profile name"
      />
    </div>
  );
};

export default SearchBox;
