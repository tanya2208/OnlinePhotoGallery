import React, { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { sendRequest } from "../../services/fetch.service";
import { setToken } from "../../services/auth.service";
import { Constants } from "../../constants";
import FormTextControl from "../../components/FormTextControl/FormTextControl";

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
  const [initialState] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = useCallback((values) => {
    sendRequest({
      url: Constants.http.url + Constants.path.login,
      method: "POST",
      body: values,
    })
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setErrorMessage("");
          navigate(Constants.routes.home);
        } else setErrorMessage("Unable to login. Please try again.");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  });

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <div>{errorMessage}</div>}
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        <Form>
          <FormTextControl label="Email" type="email" name="email"></FormTextControl>
          <FormTextControl label="Password" type="password" name="password"></FormTextControl>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(Login);
