import React from "react";
import Spinner from "../../Spinner/Spinner";
import NoteList from "../../NoteList";
import Button from "../../Button/Button";
import FakeService from "../../../services/FakeService";
import { Link } from "react-router-dom";
import "./MainScreen.scss";

class MainScreen extends React.Component {
  state = { notes: [], loading: true };

  componentDidMount() {
    FakeService.GetNotes().then(notes => {
      this.setState({ notes, loading: false });
    });
  }

  render() {
    const { loading, notes } = this.state;
    const component = loading ? (
      <Spinner />
    ) : (
      <div>
        <div className="add-note-button-container">
          <Button className="add-note-button">
            <Link to="/new">Add note</Link>
          </Button>
        </div>
        <NoteList notes={notes} />
      </div>
    );

    return component;
  }
}

export default MainScreen;
