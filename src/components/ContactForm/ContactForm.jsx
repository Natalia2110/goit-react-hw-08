import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import css from "./ContactForm.module.css";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

const INITIAL_VALUES = {
  contactName: "",
  contactNumber: "",
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

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleOnAddContact = (values, actions) => {
    // console.log(values);
    const contactObject = {
      name: values.contactName,
      number: values.contactNumber,
    };
    const newContact = {
      ...contactObject,
    };
    const thunk = addContact(newContact);
    dispatch(thunk)
      .unwrap()
      .then(() => {
        toast.success("Contact added successfully");
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleOnAddContact}
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
        <Button type="submit" variant="contained">
          Add contact
        </Button>

        {/* <button className={css.btn} type="submit">
          Add contact
        </button> */}
      </Form>
    </Formik>
  );
};

export default ContactForm;
