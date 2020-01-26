import React, { SyntheticEvent } from "react";
import Button from "./Button/Button";
import TextField from "./common/TextField/TextField";
import "./NoteForm.css";
import NoteService from "../services/NoteService";
import TagService from "../services/TagService";
import ISeverity from "../entities/ISeverity";
import INote from "../entities/INote";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import DropdownButton from "./DropdownButton/DropdownButton";
import { severityClasses } from "../common/Consts";
import AsyncCreatableSelect from "react-select/async-creatable";

interface IFormData {
  text: string;
  severity: { key: string; value: string };
  tags: Array<{ key: number; value: string }>;
}

interface INoteFormState {
  severities: Array<{ key: string; value: string }>;
  formData: IFormData;
  isSeverityDropdownOpen: boolean;
}

class NoteForm extends React.Component {
  state: INoteFormState = {
    severities: [],
    formData: {
      text: "",
      severity: { key: "2", value: "Normal" },
      tags: []
    },
    isSeverityDropdownOpen: false
  };

  componentDidMount() {
    NoteService.getSeverities().then((severities: Array<ISeverity>) => {
      this.setState({
        severities: severities.map((severity: ISeverity) =>
          severity.id.toString() === this.state.formData.severity.key
            ? {
                key: severity.id,
                value: severity.text,
                isActive: true
              }
            : {
                key: severity.id,
                value: severity.text,
                isActive: false
              }
        )
      });
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.formData.severity.key != this.state.formData.severity.key) {
      this.setState({
        severities: this.state.severities.map((severity: any) =>
          severity.key.toString() === this.state.formData.severity.key
            ? {
                key: severity.key,
                value: severity.value,
                isActive: true
              }
            : {
                key: severity.key,
                value: severity.value,
                isActive: false
              }
        )
      });
    }
  }

  private promiseOptions(inputValue: string): Promise<any> {
    return new Promise<any>(resolve => {
      if (!inputValue) {
        resolve([]);
      } else {
        TagService.searchTags(inputValue).then((tags: any) => {
          resolve(
            tags.map((t: any) => ({
              value: t.id,
              label: t.name
            }))
          );
        });
      }
    });
  }

  render() {
    return (
      <div className="form-container">
        <form
          onSubmit={e => this.onSubmit(e)}
          className={severityClasses[this.state.formData.severity.value]}
        >
          <fieldset>
            <TextField
              isMulti
              key={"text"}
              placeholder="Text"
              onChange={e => this.onChange(e, "text")}
              value={this.state.formData.text}
            />
            <div className="form-field">
              <DropdownButton
                items={this.state.severities}
                onSelect={e => this.onSeverityChange(e, "severity")}
              >
                <span className="oi oi-warning">Severity</span>
              </DropdownButton>
            </div>
            <div className="form-field">
              <AsyncCreatableSelect
                isMulti
                cacheOptions
                defaultOptions
                onChange={(newValue: any, actionMeta: any) =>
                  this.onTagSelect(newValue, actionMeta)
                }
                loadOptions={this.promiseOptions}
              />
            </div>
            <div className="form-field">
              <Button type="submit" />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }

  private onTagSelect(newValue: any, actionMeta: any) {
    this.setState({
      formData: {
        ...this.state.formData,
        tags: newValue.map((t: any) =>
          t.__isNew__
            ? {
                key: 0,
                value: t.label
              }
            : {
                key: t.value,
                value: t.label
              }
        )
      }
    });
  }

  private onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    var note: INote = {
      text: this.state.formData.text,
      severityId: parseInt(this.state.formData.severity.key),
      tags: []
    };

    NoteService.createNote(note).then((noteId: any) => {
      var tags = this.state.formData.tags.map(t => ({
        id: t.key,
        name: t.value,
        noteId: noteId
      }));
      return TagService.createTags(tags, noteId);
    });
  }

  private onSeverityChange(event: any, key: string) {
    event.preventDefault();

    this.setState({
      formData: {
        ...this.state.formData,
        [key]: {
          key: event.target.id,
          value: event.target.textContent
        }
      }
    });
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
