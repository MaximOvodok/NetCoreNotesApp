import React from "react";
import FormField, { FormFieldProps } from "../FormField/FormField";
import "./TextField.scss";

type TextFieldProps = FormFieldProps & {
  isMulti?: boolean;
  value: string;
  placeholder?: string;
};

const TextField = (props: TextFieldProps) => {
  return !props.isMulti ? (
    <input
      type="text"
      className={
        props.className ? "text-field " + props.className : "text-field"
      }
      onChange={props.onChange}
      placeholder={props.placeholder}
      value={props.value}
    />
  ) : (
    <textarea
      rows={10}
      cols={10}
      className={
        props.className
          ? "text-field multi " + props.className
          : "text-field multi"
      }
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    ></textarea>
  );
};

export default FormField(TextField);
