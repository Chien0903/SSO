import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const processAuthentication = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        
        if (!token) {
          throw new Error('No token found in the URL');
        }
        
        const success = await handleCallback(token);
        
        if (success) {
          navigate('/');
        } else {
          throw new Error('Failed to authenticate');
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    processAuthentication();
  }, [location, navigate, handleCallback]);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Processing authentication...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
