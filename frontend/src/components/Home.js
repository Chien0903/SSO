import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { authenticated, user, login, logout } = useAuth();

  return (
    <div className="container">
      <h1>Microsoft Authenticator SSO Demo</h1>
      <div className="card">
        <div className="card-body">
          {authenticated ? (
            <>
              <h2>Welcome, {user?.name || 'User'}!</h2>
              <p>You are successfully logged in.</p>
              <div className="my-4">
                <Link to="/profile" className="btn btn-primary me-3">View Profile</Link>
                <Link to="/protected" className="btn btn-success me-3">Access Protected Resource</Link>
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Welcome to the SSO Demo</h2>
              <p>Please login with your Microsoft account to continue.</p>
              <button className="btn btn-primary" onClick={login}>
                Login with Microsoft
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
