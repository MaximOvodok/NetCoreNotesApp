import React from "react";
import FormField, { FormFieldProps } from "../FormField/FormField";
import AsyncCreatableSelect from "react-select/async-creatable";
import "./DropdownField.scss";
import { ActionMeta } from "react-select";

type DropdownFieldProps = FormFieldProps & {
  isAsync: boolean;
  options?: Array<{ value: number; label: string }>;
  value?:
    | { value: number; label: string }
    | Array<{ value: number; label: string }>;
  onChange?: (event: any) => void;
};

type DropdownAsyncFieldProps = DropdownFieldProps & {
  loadOptions: (inputValue: string) => void | Promise<any>;
  onChangeAsync: (newValue: any, actionMeta: ActionMeta) => void;
};

const DropdownField = (props: DropdownAsyncFieldProps): JSX.Element => {
  const className = props.className
    ? props.className.concat(" ", "dropdown-field")
    : "dropdown-field";

  const component = props.isAsync ? (
    <AsyncCreatableSelect
      isMulti
      cacheOptions
      defaultOptions
      onChange={props.onChangeAsync}
      loadOptions={props.loadOptions}
      value={props.value}
    />
  ) : (
    <select key={props.key} className={className} onChange={props.onChange}>
      {props.options
        ? props.options.map((option: { value: number; label: string }) => (
            <option key={option.value} value={option.label}>
              {option.value}
            </option>
          ))
        : []}
    </select>
  );

  return component;
};

export default FormField(DropdownField);
