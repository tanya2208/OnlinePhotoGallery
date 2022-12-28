import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { sendRequest } from "../../common/fetch";
import { Constants } from "../../constants";
import { setToken } from "../../common/localstorage";

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
  const navigate = useNavigate();
  return (
    <div>
      <h1>Register</h1>
      {errorMessage && <div>{errorMessage}</div>}

      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          surname: "",
          city: "",
          occupation: "",
          nickname: "",
        }}
        onSubmit={async (values) => {
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
        }}
        validationSchema={RegisterSchema}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" type="string" />
          <ErrorMessage component="div" name="name" />

          <label htmlFor="surname">Surname</label>
          <Field id="surname" name="surname" type="string" />
          <ErrorMessage component="div" name="surname" />

          <label htmlFor="nickname">Nickname</label>
          <Field id="nickname" name="nickname" type="string" />
          <ErrorMessage component="div" name="nickname" />

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage component="div" name="email" />

          <label htmlFor="city">City</label>
          <Field id="city" name="city" type="string" />
          <ErrorMessage component="div" name="city" />

          <label htmlFor="occupation">Occupation</label>
          <Field id="occupation" name="occupation" type="occupation" />
          <ErrorMessage component="div" name="occupation" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <ErrorMessage
            component="div"
            name="password"
            className="invalid-feedback"
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default memo(Register);
