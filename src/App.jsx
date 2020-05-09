import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
//import { connect } from "react-redux";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";

class App extends Component {
  renderDashboard = () => {
    return <Dashboard />;
  };
  renderLogin = () => {
    return <Login />;
  };
  // BrowerRouter does not link files rightaway. setting before linkage.
  // set a default page by "/".
  render = () => {
    return (
      <BrowserRouter>
        <Route exact={true} path="/" render={this.renderDashboard} />
        <Route exact={true} path="/login" render={this.renderLogin} />
      </BrowserRouter>
    );
  };
}

export default App;
