import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import UpdateModal from "../UpdateModal/UpdateModal.jsx";
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
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const handleOpenUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const dispatch = useDispatch();
  const id = contact.id;
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
          {contact.name}
        </h2>
        <p className={css["contact-phone"]}>
          <FaPhoneAlt size="20" className={css["contact-icon"]} />{" "}
          {contact.number}
        </p>
      </div>
      <div className={css["btn-box"]}>
        <Button variant="contained" onClick={handleOpenUpdateModal}>
          Update
        </Button>

        <UpdateModal
          contact={contact}
          isOpen={updateModalIsOpen}
          onClose={handleCloseUpdateModal}
        />

        <Button variant="contained" onClick={handleOpenModalDelete}>
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
    </div>
  );
};

export default Contact;
