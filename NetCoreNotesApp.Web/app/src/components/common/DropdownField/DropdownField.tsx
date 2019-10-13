import React from "react";
import FormField, { FormFieldProps } from "../FormField/FormField";
import "./DropdownField.scss";

type DropdownFieldProps = FormFieldProps & {
  options: Array<{ key: string; value: string }>;
  value?: { key: string; value: string };
};

const DropdownField = (props: DropdownFieldProps): JSX.Element => {
  return (
    <select
      key={props.key}
      className={
        props.className ? props.className + " dropdown-field" : "dropdown-field"
      }
      onChange={props.onChange}
    >
      {props.options.map((option: { key: string; value: string }) => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </select>
  );
};

export default FormField(DropdownField);
