import React, { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { sendRequest } from "../../services/fetch.service";
import { setToken } from "../../services/auth.service";
import { Constants } from "../../constants";
import FormTextControl from "../../components/FormTextControl/FormTextControl";

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  nickname: yup.string().required("Nickname is required"),
  city: yup.string(),
  occupation: yup.string(),
});

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [initialState] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    city: "",
    occupation: "",
    nickname: "",
  });
  const navigate = useNavigate();

  const handleSubmit = useCallback((values) => {
    sendRequest({
      url: Constants.http.url + Constants.path.register,
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
      <h1>Register</h1>
      {errorMessage && <div>{errorMessage}</div>}

      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        <Form>
          <FormTextControl label="Name" type="string" name="name"></FormTextControl>
          <FormTextControl label="Surname" type="string" name="surname"></FormTextControl>
          <FormTextControl label="Nickname" type="string" name="nickname"></FormTextControl>
          <FormTextControl label="Email" type="email" name="email"></FormTextControl>
          <FormTextControl label="City" type="string" name="city"></FormTextControl>
          <FormTextControl label="Occupation" type="string" name="occupation"></FormTextControl>
          <FormTextControl label="Password" type="password" name="password"></FormTextControl>
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(Register);
