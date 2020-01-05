import React from "react";
import { Layout } from "./components/default/Layout";
import MainScreen from "./components/screens/MainScreen/MainScreen";
import FormScreen from "./components/screens/FormScreen/FormScreen";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = { notes: [], loading: true };

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/" exact component={MainScreen} />
          <Route path="/new" component={FormScreen} />
        </Layout>
      </Router>
    );
  }
}

export default App;
