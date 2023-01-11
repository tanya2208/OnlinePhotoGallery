import React, { memo } from "react";
import { Field, ErrorMessage } from "formik";

function FormTextControl(props) {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <Field id={props.name} name={props.name} type={props.type} />
      <ErrorMessage component={props.name} name={props.name} />
    </>
  );
}

export default memo(FormTextControl);
