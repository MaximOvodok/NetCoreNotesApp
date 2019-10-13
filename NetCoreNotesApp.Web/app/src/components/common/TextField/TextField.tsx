import React from "react";
import FormField, { FormFieldProps } from "../FormField/FormField";
import "./TextField.scss";

type TextFieldProps = FormFieldProps & {
  value: string;
};

const TextField = (props: TextFieldProps) => {
  return (
    <input
      type="text"
      className={
        props.className ? "text-field " + props.className : "text-field"
      }
      onChange={props.onChange}
    />
  );
};

export default FormField(TextField);
