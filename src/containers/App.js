import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import LoginScreen from './LoginScreen';
import AdminScreen from './AdminScreen';
import NewsFeedScreen from './NewsFeedScreen';
import ProfileScreen from './ProfileScreen';
import ListCategoriesScreen from './ListCategoriesScreen';
import CategoriesDetail from './CategoriesDetail';
import NotFound from './NotFound';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/admin">
            <AdminScreen />
          </Route>
          <Route exact path="/">
            <NewsFeedScreen />
          </Route>
          <Route exact path="/profile/:role/:id" render={(props) => <ProfileScreen {...props} />} />
          <Route exact path="/categories">
            <ListCategoriesScreen />
          </Route>
          <Route exact path="/categories/:aliasKey" render={(props) => <CategoriesDetail {...props} />} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
