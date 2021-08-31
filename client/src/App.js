import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/session/SignIn";
import SignUp from "./components/session/SignUp";

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
                  <Redirect to="/information" />
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
                  <Redirect to="/information" />
                )
              } 
            />
            <Route
              exact 
              path="/information" 
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
