import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import Button from "@mui/material/Button";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>{`Welcome, ${user.name}`}</p>
      <Button
        variant="contained"
        type="button"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
};
