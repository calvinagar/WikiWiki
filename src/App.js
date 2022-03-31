import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

function App() 
{
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path = "/register">
          <RegisterPage />
        </Route>
        <Route exact path = "/main">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
