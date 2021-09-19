import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import RegistriesDashboard from "./components/dashboard/Dashboard";
import UsersDasboard from "./components/users/Dashboard";
import SignIn from "./components/session/SignIn";

import path from "./domain";

import './assets/styles/app.css';

//https://www.coeplimcolima.com/
//http://tracelemon.net/public/

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch(`${path}auth/is-verify`, {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      if (parseRes === true) setAuth(true);
      else {
        localStorage.removeItem("token");
        setAuth(false)
      }

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth()
  });

  return (
    <div>
      <Router>
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
            path="/users"
            render={props =>
              isAuthenticated ? (
                <UsersDasboard {...props} setAuth={setAuth} />
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
                <RegistriesDashboard {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
