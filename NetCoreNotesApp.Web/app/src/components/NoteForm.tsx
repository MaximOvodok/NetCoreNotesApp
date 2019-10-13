import React from "react";
import Button from "./Button/Button";
import TextField from "./common/TextField/TextField";
import DropdownField from "./common/DropdownField/DropdownField";
import "./NoteForm.scss";
import FakeService from "../services/FakeService";
import ISeverity from "../entities/ISeverity";

interface IFormData {
  Text: string;
  Severity: { key: string; value: string };
}

interface NoteFormState {
  Severities: Array<{ key: string; value: string }>;
  FormData: IFormData;
}

class NoteForm extends React.Component {
  state: NoteFormState = {
    Severities: [],
    FormData: {
      Text: "",
      Severity: { key: "", value: "" }
    }
  };

  render() {
    FakeService.GetSeverities().then((severities: Array<ISeverity>) => {
      this.setState({
        severities: severities.map((severity: ISeverity) => ({
          key: severity.Id,
          value: severity.Text
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
              value={this.state.FormData.Text}
            />
            <DropdownField
              labelText="Severity"
              options={this.state.Severities}
              key={"severity"}
              value={this.state.FormData.Severity}
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
        ...this.state.FormData,
        [key]: event.target.value
      }
    });
  }
}

export default NoteForm;
