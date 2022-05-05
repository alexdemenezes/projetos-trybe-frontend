import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './Components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (

              <Login />

            ) }
          />
          <Route
            path="/search"
            render={ () => (
              <>
                <Header />
                <Search />
              </>
            ) }
          />
          <Route
            path="/album/:id"
            render={ (propsRoute) => (
              <>
                <Header />
                <Album { ...propsRoute } />
              </>
            ) }
          />
          <Route
            path="/favorites"
            render={ () => (
              <>
                <Header />
                <Favorites />
              </>
            ) }
          />
          <Route
            exact
            path="/profile"
            render={ () => (
              <>
                <Header />
                <Profile />
              </>
            ) }
          />
          <Route
            path="/profile/edit"
            render={ () => (
              <>
                <Header />
                <ProfileEdit />
              </>
            ) }
          />
          <Route
            path="/*"
            render={ (propsRoute) => <NotFound { ...propsRoute } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
