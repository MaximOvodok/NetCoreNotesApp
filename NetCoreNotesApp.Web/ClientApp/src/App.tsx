import React from "react";
import { Layout } from "./components/default/Layout";
import { MainScreen, FormScreen } from "./components/screens";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = { notes: [], loading: true };

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={MainScreen} />
            <Route path="/new" component={FormScreen} />
            <Route path="/edit" component={FormScreen} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
