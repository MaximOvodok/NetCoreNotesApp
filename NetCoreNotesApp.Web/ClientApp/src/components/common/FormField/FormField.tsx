import React from "react";
import "./FormField.css";

export type FormFieldProps = {
  labelText?: string;
  errorText?: string;
  key?: string;
  className?: string;
  onChange?: (event: any) => void;
};

const FormField = <P extends FormFieldProps>(
  ComposedComponent: React.ComponentType<P>
): React.FunctionComponent<P> => {
  const FormField = (props: P) => {
    return (
      <div className="form-field">
        {props.labelText ? (
          <div className="field-label-text-container">
            <div className="field-label-text">{props.labelText}</div>
          </div>
        ) : null}
        <ComposedComponent {...props} />
        {props.errorText ? (
          <div className="form-field-error">
            <span className="ms-formvalidation">{props.errorText}</span>
          </div>
        ) : null}
      </div>
    );
  };

  return FormField;
};

export default FormField;
