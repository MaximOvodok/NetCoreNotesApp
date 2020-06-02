import FormBuilder from "./FormBuilder";

export default class Validator {
  private _formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this._formBuilder = formBuilder;
  }

  public Validate() {
    return this._formBuilder.validateControls();
  }
}
