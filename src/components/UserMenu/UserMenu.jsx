import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operation";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>
        Welcome,
        {user.name}
        {/* userName */}
      </p>
      <button type="button" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
};
