/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import LoginStore from '../store/LoginStore.js';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = LoginStore.refreshToken();

  const render = props => (isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  ));

  return (
    <Route
      {...rest}
      render={render}
    />
  );
};

export default PrivateRoute;
