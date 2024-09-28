import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operation";
import { selectAuthError } from "../../redux/auth/selectors";
import Button from "@mui/material/Button";

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Ім'я користувача є обов'язковим")
    .min(2, "Ім'я користувача має бути мінімум в 2 символи")
    .max(100, "Ім'я користувача має бути меншим за 100 символів"),
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, "Пароль має бути мінімум в 8 символи")
    .max(100, "Пароль має бути меншим за 100 символів"),

  email: Yup.string()
    .email("Некоректна електронна адреса")
    .required("Електронна адреса є обов'язковим"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={RegisterValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
          <label className={css.label}>
            <span className={css["form-span"]}>Name:</span>
            <Field
              type="text"
              name="name"
              className={css.field}
              placeholder="Кирило"
            />
            <ErrorMessage
              className={css.errorText}
              name="name"
              component="span"
            />
          </label>
          <label className={css.label}>
            <span className={css["form-span"]}>Email:</span>
            <Field
              type="text"
              name="email"
              className={css.field}
              placeholder="kirilo.example@gmail.com"
            />
            <ErrorMessage
              className={css.errorText}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span className={css["form-span"]}>Password:</span>
            <Field
              type="password"
              name="password"
              className={css.field}
              placeholder="Введіть свій пароль"
            />
            <ErrorMessage
              className={css.errorText}
              name="password"
              component="span"
            />
          </label>

          <Button
            variant="contained"
            disabled={Object.keys(errors).length > 0}
            // className={css.submitBtn}
            size="large"
            type="submit"
          >
            Register
          </Button>
          {error && (
            <p className={css.errorText}>Oops, some error occured... {error}</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
