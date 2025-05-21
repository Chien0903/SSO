import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import AuthCallback from './components/AuthCallback';
import Profile from './components/Profile';
import ProtectedResource from './components/ProtectedResource';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <div className="container">
              <a className="navbar-brand" href="/">Microsoft SSO Demo</a>
            </div>
          </nav>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/protected" 
              element={
                <PrivateRoute>
                  <ProtectedResource />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
