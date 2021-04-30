import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import AdminScreen from './AdminScreen';
import FacultyNewsFeedScreen from './faculty/FacultyNewsFeedScreen';
import FacultyProfileScreen from './faculty/FacultyProfileScreen';
import ListCategoriesScreen from './ListCategoriesScreen';

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
          <Route exact path="/admin">
            <AdminScreen />
          </Route>
          <Route exact path="/faculty">
            <FacultyNewsFeedScreen />
          </Route>
          <Route exact path="/faculty/profile">
            <FacultyProfileScreen />
          </Route>
          <Route exact path="/categories">
            <ListCategoriesScreen />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect()(App);
