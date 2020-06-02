import React from "react";
import { Layout } from "./components/default/Layout";
import { MainScreen } from "./components/screens";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = { notes: [], loading: true };

  render() {
    return (
      <Router>
        <Layout>
          <Route path="/" component={MainScreen} />
        </Layout>
      </Router>
    );
  }
}

export default App;
