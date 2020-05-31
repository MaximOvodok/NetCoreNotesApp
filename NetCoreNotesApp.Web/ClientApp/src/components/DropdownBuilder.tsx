import React from "react";
import IFormControlBuilder from "./IFormControlBuilder";
import { DropdownField } from "./controls";

export default class DropdownBuilder implements IFormControlBuilder {
  private _loadOptions: (inputValue: string) => Promise<any>;
  private _onChange: (newValue: any, actionMeta: any) => void;
  private _key: string;
  private _isAsync: boolean;
  private _value: any;
  private _validationRules: Array<(value: any) => any>;
  private _isRequired: boolean;
  private _errorText: string;

  constructor(options: any) {
    this._key = options.key;
    this._loadOptions = options.loadOptions;
    this._onChange = options.onChange;
    this._isAsync = options.isAsync;
    this._value = options.value;
    this._validationRules = options.validationRules || [];
    this._isRequired = options.isRequired;
    this._errorText = options.errorText;
  }

  public getFieldValue(e: any): any {
    return {
      [this._key]: e
        ? e.map((dropdownItem: any) =>
            dropdownItem.__isNew__
              ? {
                  value: 0,
                  label: dropdownItem.label,
                }
              : {
                  value: dropdownItem.value,
                  label: dropdownItem.label,
                }
          )
        : [],
    };
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
      <DropdownField
        key={this._key}
        isAsync={this._isAsync}
        onChangeAsync={(e: any, actionMeta: any) =>
          this._onChange(e, this.getFieldValue(e))
        }
        loadOptions={this._loadOptions}
        value={this._value}
        errorText={this._errorText}
      />
    );
  }
}
