import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/session/SignIn";
import SignUp from "./components/session/SignUp";

import './assets/styles/app.css'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route
              exact 
              path="/login" 
              render={props => 
                !isAuthenticated ? (
                  <SignIn {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              } 
            />
            <Route
              exact 
              path="/register" 
              render={props => 
                !isAuthenticated ? (
                  <SignUp {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/" />
                )
              } 
            />
            <Route
              exact 
              path="/" 
              render={props => 
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              } 
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
