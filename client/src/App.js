import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/session/SignIn";
import AuthContext from "./AuthContext";

import './assets/styles/app.css';

//https://www.coeplimcolima.com/
//http://tracelemon.net/public/

const App = () => {

  const context = useContext(AuthContext);

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={props =>
              !context.isLoggedIn ? (
                <SignIn {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/"
            render={props =>
              context.isLoggedIn ? (
                <Dashboard {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default React.memo(App);
