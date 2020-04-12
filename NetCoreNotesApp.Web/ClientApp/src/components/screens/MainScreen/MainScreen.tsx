import React from "react";
import { Spinner, Button } from "../../controls";
import NoteList from "../../NoteList";
import { Link } from "react-router-dom";
import "./MainScreen.scss";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Notes";

import { INoteProps } from "../../../types/ComponentsPropsTypes";

class MainScreen extends React.Component<INoteProps, {}> {
  componentDidMount() {
    this.props.requestNotes();
  }

  render() {
    const component = this.props.isNotesFetching ? (
      <Spinner />
    ) : (
      <div>
        <div className="add-note-button-container">
          <Button className="add-note-button">
            <Link to={{ pathname: "/new", state: { isOpen: true } }}>
              Add note
            </Link>
          </Button>
        </div>
        <NoteList notes={this.props.items} />
      </div>
    );

    return component;
  }
}

export default connect(
  (state) => state.notes,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(MainScreen);
