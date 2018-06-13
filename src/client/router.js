import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import AppLayout from './components/AppLayout';

export default function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" name="login" component={Login}/>
        <Route path="/" name="home" component={AppLayout}/>
      </Switch>
    </BrowserRouter>
  );
}
