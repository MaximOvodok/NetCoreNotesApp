import IFormControlBuilder from "./IFormControlBuilder";
import { FormGroup } from "reactstrap";
import React from "react";

export default class FormBuilder {
  private _controls: Array<IFormControlBuilder>;

  constructor() {
    this._controls = new Array<IFormControlBuilder>();
  }

  public addField(field: IFormControlBuilder): FormBuilder {
    this._controls.push(field);
    return this;
  }

  public validateControls(): any {
    let validationResult = {};
    this._controls.forEach((control) => {
      let controlResult = control.validate();
      validationResult = {
        ...validationResult,
        ...controlResult,
      };
    });

    return validationResult;
  }

  public buildForm = (): JSX.Element => (
    <FormGroup>
      {this._controls.map((formField: IFormControlBuilder) =>
        formField.buildControl()
      )}
    </FormGroup>
  );
}
