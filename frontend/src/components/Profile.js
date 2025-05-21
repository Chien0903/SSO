import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import AuthService from '../services/authService';

const Profile = () => {
  const { authenticated, user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!authenticated) return;
      
      try {
        const data = await AuthService.getUserInfo();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authenticated]);

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>User Profile</h1>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h2>{user?.name || 'User'}</h2>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <strong>Email:</strong> {user?.email || 'Not provided'}
            </div>
            {userData?.graph_data && (
              <>
                <h3>Microsoft Graph Data:</h3>
                <pre className="border p-3 bg-light">
                  {JSON.stringify(userData.graph_data, null, 2)}
                </pre>
              </>
            )}
          </div>
          <div className="card-footer">
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
