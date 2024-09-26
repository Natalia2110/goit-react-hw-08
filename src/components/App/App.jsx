// import ContactList from "./components/ContactList/ContactList";
// import SearchBox from "./components/SearchBox/SearchBox";
// import ContactForm from "./components/ContactForm/ContactForm";
// import css from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { fetchContacts } from "./redux/contacts/contacts.js";
// import { getIsLoading } from "./redux/contacts/operations.js";
// import { getError } from "./redux/contacts/operations.js";

// =============================================
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import css from "./App.module.css";
// import { Navigation } from "./components/Navigation/Navigation.jsx";
import { Layout } from "../Layout.jsx";
import {
  // selectAuthIsLoggedIn,
  // selectAuthUser,
  selectAuthIsRefreshing,
} from "../../redux/auth/selectors.js";
import {
  refreshUser,
  // logout
} from "../../redux/auth/operation.js";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";
import RestrictedRoute from "../RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute.jsx";

const ContactsPage = lazy(() =>
  import("../../pages/ContactsPage/ContactsPage.jsx")
);
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage.jsx"));
const RegistrationPage = lazy(() =>
  import("../../pages/RegistrationPage/RegistrationPage.jsx")
);

const App = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  // const user = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // const onLogout = () => {
  //   dispatch(logout());
  // };

  if (isRefreshing) return <p>User is refreshing, please wait</p>;

  return isRefreshing ? (
    <p>User is refreshing, please wait</p>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={<RestrictedRoute component={<RegistrationPage />} />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route
          path="/contacts"
          element={<PrivateRoute component={<ContactsPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

// =============================================

// const App = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(getIsLoading);
//   const error = useSelector(getError);

//   useEffect(() => {
//     dispatch(fetchContacts());
//   }, [dispatch]);

//   return (
//     <div className={css.container}>
//       <h1 className={css.title}>Phonebook</h1>
//       <ContactForm />
//       <SearchBox />
//       {isLoading && <b>Loading...</b>}
//       {error && <b>{error}</b>}
//       <ContactList />
//     </div>
//   );
// };

export default App;
