import React from 'react';
//  { useState, useEffect }
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import socketIOClient from 'socket.io-client';
import LoginScreen from './LoginScreen';
import AdminScreen from './AdminScreen';
import NewsFeedScreen from './NewsFeedScreen';
import ProfileScreen from './ProfileScreen';
import ListCategoriesScreen from './ListCategoriesScreen';
import CategoriesDetail from './CategoriesDetail';
import NotFound from './NotFound';
import NotiDetailScreen from './NotiDetailScreen';

// const ENDPOINT = 'http://webnc.ap-1.evennode.com';

const App = () => {
  // const [response, setResponse] = useState('');

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on('new-noti', (data) => {
  //     console.log('hello');
  //     setResponse(data);
  //   });
  //   console.log(response);
  //   return () => socket.disconnect();
  // }, []);

  // console.log('res socket');
  // console.log(response);
  console.warn = () => { };
  console.error = () => { };
  console.log = () => { };
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
        <Route exact path="/noti/:id" render={(props) => <NotiDetailScreen {...props} />} />
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
