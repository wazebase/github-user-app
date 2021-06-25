/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import UserPage from './pages/UserPage/UserPage';
import NotFound from './pages/NotFound/NotFound';

import './user-app.scss';

const UserApp = () => (
  <div className="app">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/:userlogin">
          <UserPage />
        </Route>
        <Route exact path="/:userlogin/notfound">
          <NotFound />
        </Route>
      </Switch>

    </Router>
  </div>
);

export default UserApp;
