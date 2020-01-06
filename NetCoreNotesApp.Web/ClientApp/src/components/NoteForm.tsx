import React, { SyntheticEvent } from "react";
import Button from "./Button/Button";
import TextField from "./common/TextField/TextField";
import DropdownField from "./common/DropdownField/DropdownField";
import "./NoteForm.css";
import NoteService from "../services/NoteService";
import ISeverity from "../entities/ISeverity";
import INote from "../entities/INote";

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
        NoteService.getSeverities().then((severities: Array<ISeverity>) => {
            this.setState({
                severities: severities.map((severity: ISeverity) => ({
                    key: severity.id,
                    value: severity.text
                }))
            });
        });

        return (
            <div className="form-container">
                <form onSubmit={e => this.onSubmit(e)}>
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
                            onChange={e => this.onSeverityChange(e, "severity")}
                        />
                        <Button type="submit" />
                    </fieldset>
                </form>
            </div>
        );
    }

    private onSubmit(event: SyntheticEvent) {
        event.preventDefault();

        var note: INote = {
            text: this.state.formData.text,

            severityId: parseInt(this.state.formData.severity.value),
            tags: []
        };

        NoteService.createNote(note);
    }

    private onSeverityChange(event: any, key: string) {
        this.setState({
            formData: {
                ...this.state.formData,
                [key]: {
                    ["value"]: event.target.value
                }
            }
        })
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
