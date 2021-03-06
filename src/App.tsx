import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext'
import {ThemeContextProvider} from './contexts/ThemeContext'

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  )
}

export default App;
