import React from "react";
import NoteForm from "../../NoteForm";
import "./FormScreen.scss";
import { NoteFormContainerState } from "../../../types/StoreTypes";
import { actionCreators } from "../../../store/NoteForm";
import { connect } from "react-redux";
import { NoteFormScreenProps } from "../../../types/ComponentsPropsTypes";

class FormScreen extends React.Component<NoteFormScreenProps, {}> {
  public render() {
    return (
      <NoteForm
        setNoteValue={(e, value) => this.handleChange(e, value)}
        values={this.props.values}
        errors={this.props.errors}
        validateAction={this.props.validateNote}
      />
    );
  }

  private handleChange(e: any, value: any): void {
    this.props.setNoteValue(value);
  }
}

export default connect(
  (state: NoteFormContainerState) => {
    return state.noteForm;
  },
  (dispatch) => ({
    setNoteValue: (value: any) => {
      dispatch(actionCreators.setNoteValue(value));
    },
    validateNote: (errors: any) => {
      dispatch(actionCreators.validateNoteValues(errors));
    },
  })
)(FormScreen);
