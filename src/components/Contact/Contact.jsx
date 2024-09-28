// import * as React from "react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  deleteContact,
  // updateContact,
} from "../../redux/contacts/operations.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import css from "./Contact.module.css";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

const Contact = ({ contact }) => {
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const handleOpenModalDelete = () => {
    setModalDeleteIsOpen(true);
  };
  const handleCloseModalDelete = () => {
    setModalDeleteIsOpen(false);
  };

  const dispatch = useDispatch();
  const id = contact.id;
  const deleteContactById = (id) => {
    // console.log(id);
    const thunk = deleteContact(id);
    dispatch(thunk)
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully");
      });
  };

  // const updateContactByName = (contact) => {
  //   console.log(contact);

  //   const thunk = updateContact(contact);
  //   dispatch(thunk)
  //     .unwrap()
  //     .then(() => {
  //       toast.success("Contact update successfully");
  //     });
  // };
  return (
    <div className={css["contact"]}>
      <div className={css["contact-box"]}>
        <h2 className={css["contact-name"]}>
          <FaUser size="20" className={css["contact-icon"]} />
          {contact.name}
        </h2>
        <p className={css["contact-phone"]}>
          <FaPhoneAlt size="20" className={css["contact-icon"]} />{" "}
          {contact.number}
        </p>
      </div>
      <div className={css["btn-box"]}>
        <Button
          variant="contained"
          // onClick={handleOpen}
        >
          Update
        </Button>
        <Button
          variant="contained"
          onClick={
            handleOpenModalDelete
            // () => deleteContactById(id)
          }
        >
          Delete
        </Button>
        <DeleteModal
          isOpen={modalDeleteIsOpen}
          onClose={handleCloseModalDelete}
          onDelete={() => {
            deleteContactById(id);
          }}
        />
      </div>

      {/* <button
        type="button"
        className={css.btn}
        onClick={() => deleteContactById(id)}
      >
        Delete
      </button> */}
    </div>
  );
};

export default Contact;
