import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext'

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
