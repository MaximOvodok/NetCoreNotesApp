import { TextField } from "./controls";
import IFormControlBuilder from "./IFormControlBuilder";
import React from "react";
import ValidationRules from "./ValidationRules";

export default class TextBoxBuilder implements IFormControlBuilder {
  private _key: string;
  private _placeholder: string;
  private _onChange: (event: any, key: string) => void;
  private _value: any;
  private _isMulti: boolean;
  private _isRequired: boolean;
  private _errorText: string;
  private _validationRules: Array<(value: any) => string>;

  constructor(options: any) {
    this._key = options.key;
    this._placeholder = !options.isRequired
      ? options.placeholder
      : options.placeholder.concat("*");
    this._onChange = options.onChange;
    this._value = options.value;
    this._isMulti = options.isMulti;
    this._isRequired = options.isRequired;
    this._errorText = options.errorText;
    this._validationRules = options.validationRules || [];
  }

  public getFieldValue(e: any): any {
    this._value = e.target.value;
    return { [this._key]: this._value };
  }

  public validate(): any {
    let validationResult = "";
    this._validationRules.forEach((rule) => {
      validationResult = rule(this._value);
      if (validationResult) {
        return;
      }
    });

    return { [this._key]: validationResult };
  }

  public buildControl(): JSX.Element {
    return (
      <TextField
        isMulti={this._isMulti}
        key={this._key}
        placeholder={this._placeholder}
        onChange={(e) => this._onChange(e, this.getFieldValue(e))}
        value={this._value}
        errorText={this._errorText}
      />
    );
  }
}
