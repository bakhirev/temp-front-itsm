import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../../MainPage';

function AuthorizationSuccess() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
        <Route path="/about">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default AuthorizationSuccess;
