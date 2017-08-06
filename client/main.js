import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router-dom';

//components
import Header from './components/parts/header';
import Footer from './components/parts/footer';
import Redirect from './components/business/redirect';

import LoginForm from './components/pages/signin';
import SignUp from './components/pages/signup';
import MyTodos from './components/pages/todos';
import TodoForm from './components/pages/todo_form';

const routes = (
  <BrowserRouter history={browserHistory}>
    <div>
      <Route path="*" component={Header} />
      <Route exact path="/" component={MyTodos} />
      <Route exact path="/todo/delete/:todoId" component={MyTodos} />
      <Route exact path="/todo/:todoId" component={TodoForm} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={LoginForm} />
      <Footer />
    </div>
  </BrowserRouter>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.appcontent'));
});
