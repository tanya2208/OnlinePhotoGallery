import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { sendRequest } from "../../common/fetch";
import { setToken } from "../../common/localstorage";
import { Constants } from "../../constants";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
});

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          sendRequest({
            url: Constants.http.url + Constants.path.login,
            method: "POST",
            body: values,
          })
            .then((res) => {
              if (res.token) {
                setToken(res.token)
                setErrorMessage("");
                navigate(Constants.routes.home);
              } else setErrorMessage('Unable to login. Please try again.');
            })
            .catch((err) => {
              setErrorMessage(err.message);
            });
        }}
        validationSchema={LoginSchema}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage component="div" name="email" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <ErrorMessage
            component="div"
            name="password"
            className="invalid-feedback"
          />
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(Login);
