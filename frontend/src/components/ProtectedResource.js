import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthService from '../services/authService';

const ProtectedResource = () => {
  const { authenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      if (!authenticated) return;
      
      try {
        const result = await AuthService.getProtectedResource();
        setData(result);
      } catch (err) {
        console.error('Error fetching protected data:', err);
        setError(err.message || 'Failed to access protected resource');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
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
        <span className="ms-3">Loading protected resource...</span>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Protected Resource</h1>
      
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h2>Protected Content</h2>
          </div>
          <div className="card-body">
            <p className="lead">{data?.message}</p>
            
            {data?.user && (
              <div className="mt-4">
                <h3>Your User Info:</h3>
                <pre className="border p-3 bg-light">
                  {JSON.stringify(data.user, null, 2)}
                </pre>
              </div>
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

export default ProtectedResource;
