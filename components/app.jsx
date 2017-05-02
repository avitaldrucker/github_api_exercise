import React from 'react';
import Header from './header';
import ProfilePage from './profile_page';
import SignIn from './sign_in';
import Footer from './footer';
import { logIn } from '../actions/session_actions';

import { connect } from 'react-redux';

const App = ({ children, loggedIn, location, user, logInUser }) => {
  if (loggedIn && !user) {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');
    logInUser({ username: username, token: token });
    return(<div></div>);
  }
  else if (loggedIn && location.pathname === "/") {
    return(<ProfilePage />);
  }
  else if (loggedIn) {
    return(children);
  }
  else {
    return(<SignIn />)
  }
};

const mapStateToProps = (state) => {
  return {
    loggedIn: sessionStorage.getItem('username') || !!state.session.user,
    user: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logInUser: (user) => { return dispatch(logIn(user)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
