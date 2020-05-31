import IFormControlBuilder from "./IFormControlBuilder";
import { DropdownButton } from "./controls";
import React from "react";

export default class DropdownButtonBuilder implements IFormControlBuilder {
  private _key: string;
  private _items: Array<any>;
  private _onSeverityChange: (event: any, key: string) => void;
  private _value: any;
  private _validationRules: Array<(value: any) => any>;

  constructor(options: any) {
    this._key = options.key;
    this._items = options.items;
    this._onSeverityChange = options.onSeverityChange;
    this._value = options.value;
    this._validationRules = options.validationRules || [];
  }

  public getFieldValue(e: any): any {
    this._value = {
      [this._key]: {
        key: e.target.id,
        value: e.target.textContent,
      },
    };
    return this._value;
  }

  public validate() {
    let validationResult = "";
    this._validationRules.forEach((rule) => {
      validationResult = rule(this._value);
      if (validationResult) {
        return;
      }
    });

    return { [this._key]: validationResult };
  }

  public buildControl = (): JSX.Element => (
    <DropdownButton
      key={this._key}
      items={this._items}
      onSelect={(e) => this._onSeverityChange(e, this.getFieldValue(e))}
    >
      <span className="oi oi-warning">Severity</span>
    </DropdownButton>
  );
}
