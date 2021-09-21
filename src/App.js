import React from 'react';
import { Switch } from 'react-router';

import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';

import { ProfileProvider } from './context/profile.context';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
  return (
    <ErrorBoundary>
      <ProfileProvider>
        <Switch>
          <PublicRoute path="/signin">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </ProfileProvider>
    </ErrorBoundary>
  );
}

export default App;
