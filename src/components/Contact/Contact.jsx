import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import css from "./Contact.module.css";
import toast from "react-hot-toast";

const Contact = ({ name, number, id }) => {
  const dispatch = useDispatch();

  const deleteContactById = (id) => {
    const thunk = deleteContact(id);
    dispatch(thunk)
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully");
      });
  };
  return (
    <div className={css["contact"]}>
      <div className={css["contact-box"]}>
        <h2 className={css["contact-name"]}>
          <FaUser size="20" className={css["contact-icon"]} />
          {name}
        </h2>
        <p className={css["contact-phone"]}>
          <FaPhoneAlt size="20" className={css["contact-icon"]} /> {number}
        </p>
      </div>
      <button
        type="button"
        className={css.btn}
        onClick={() => deleteContactById(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
