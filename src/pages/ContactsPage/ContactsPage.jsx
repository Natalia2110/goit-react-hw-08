import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./ContactsPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIsLoading, getError } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import Loader from "../../components/Loader/Loader";
// import toast from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
    // .unwrap()
    // .then(() => {
    //   toast.success("Contacts loaded successfully🎉");
    // });
  }, [dispatch]);
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && (
        <b>
          <Loader />
        </b>
      )}
      {error && <b>{error}</b>}
      <ContactList />
    </div>
  );
};

export default ContactsPage;
