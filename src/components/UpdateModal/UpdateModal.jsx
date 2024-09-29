import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import css from "./UpdateModal.module.css";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateContact } from "../../redux/contacts/operations.js";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#acc5fa",
  border: "1px solid #3468d8",
  borderRadius: "10px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const phoneRegExp = /^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

const ContactValidationSchema = Yup.object().shape({
  contactName: Yup.string()
    .required("Ім'я контакту є обов'язковим")
    .min(3, "Ім'я має бути більше 3-х символів")
    .max(50, "Ім'я має бути меньше 50 символів"),
  contactNumber: Yup.string()
    .matches(
      phoneRegExp,
      "Номер телефону має співпадати з форматом 'xxx-xxx-xx-xx'"
    )
    .required("Номер телефону є обов'язковий"),
});

export const UpdateModal = ({ contact, isOpen, onClose }) => {
  const INITIAL_VALUES = {
    contactName: contact.name,
    contactNumber: contact.number,
  };

  const dispatch = useDispatch();

  const handleOnBtnUpdateContact = (values) => {
    const newContact = {
      id: contact.id,
      name: values.contactName,
      number: values.contactNumber,
    };
    onClose();
    if (
      contact.name === newContact.name &&
      contact.number === newContact.number
    ) {
      return;
    } else {
      const thunk = updateContact(newContact);
      dispatch(thunk)
        .unwrap()
        .then(() => {
          toast.success("Contact update successfully");
        });
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleOnBtnUpdateContact}
            validationSchema={ContactValidationSchema}
          >
            <Form className={css.form}>
              <label className={css["form-label"]}>
                <span className={css["form-span"]}>Name</span>
                <Field
                  className={css.field}
                  type="text"
                  name="contactName"
                  placeholder="Max Smith"
                />
                <ErrorMessage
                  name="contactName"
                  component="span"
                  className={css.error}
                />
              </label>
              <label className={css["form-label"]}>
                <span className={css["form-span"]}>Number</span>
                <Field
                  className={css.field}
                  type="tel"
                  name="contactNumber"
                  placeholder="050-123-45-67"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="span"
                  className={css.error}
                />
              </label>
              <div className={css["btn-box"]}>
                <Button
                  type="submit"
                  variant="contained"
                  //   onClick={handleOnBtnUpdateContact}
                >
                  Update contact
                </Button>
                <Button variant="contained" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
