import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/">
            <MainScreen />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
