import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations.js";
import { selectAuthError } from "../../redux/auth/selectors";
import Button from "@mui/material/Button";

const LoginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Пароль є обов'язковим")
    .min(8, "Пароль має бути мінімум в 8 символи")
    .max(100, "Пароль має бути меншим за 100 символів"),

  email: Yup.string()
    .email("Некоректна електронна адреса")
    .required("Електронна адреса є обов'язковим"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.form}>
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
            disabled={Object.keys(errors).length > 0}
            variant="contained"
            size="large"
            type="submit"
          >
            Log in
          </Button>
          {error && (
            <p className={css.errorText}>Oops, some error occured... {error}</p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
