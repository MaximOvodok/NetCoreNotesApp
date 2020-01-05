import React from "react";
import Button from "./Button/Button";
import TextField from "./common/TextField/TextField";
import DropdownField from "./common/DropdownField/DropdownField";
import "./NoteForm.css";
import NoteService from "../services/NoteService";
import ISeverity from "../entities/ISeverity";

interface IFormData {
  text: string;
  severity: { key: string; value: string };
}

interface NoteFormState {
  severities: Array<{ key: string; value: string }>;
  formData: IFormData;
}

class NoteForm extends React.Component {
  state: NoteFormState = {
    severities: [],
    formData: {
      text: "",
      severity: { key: "", value: "" }
    }
  };

  render() {
    NoteService.GetSeverities().then((severities: Array<ISeverity>) => {
      this.setState({
        severities: severities.map((severity: ISeverity) => ({
          key: severity.id,
          value: severity.text
        }))
      });
    });

    return (
      <div className="form-container">
        <form>
          <fieldset>
            <TextField
              labelText="Text"
              key={"text"}
              onChange={e => this.onChange(e, "text")}
              value={this.state.formData.text}
            />
            <DropdownField
              labelText="Severity"
              options={this.state.severities}
              key={"severity"}
              value={this.state.formData.severity}
              onChange={e => this.onChange(e, "severity")}
            />
            <Button type="submit" />
          </fieldset>
        </form>
      </div>
    );
  }

  private onChange(event: any, key: string) {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: event.target.value
      }
    });
  }
}

export default NoteForm;
