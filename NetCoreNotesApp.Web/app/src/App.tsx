import React from "react";
import MainScreen from "./components/screens/MainScreen/MainScreen";
import FormScreen from "./components/screens/FormScreen/FormScreen";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = { notes: [], loading: true };

  render() {
    return (
      <Router>
        <Route path="/" exact component={MainScreen}></Route>
        <Route path="/new" component={FormScreen}></Route>
      </Router>
    );
  }
}

export default App;
