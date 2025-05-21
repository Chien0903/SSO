/**
 * API service for authentication with Microsoft
 */

const API_URL = 'http://localhost:8000';

export const AuthService = {
  /**
   * Get the login URL from the backend
   * @returns {Promise<{auth_url: string}>}
   */
  getLoginUrl: async () => {
    const response = await fetch(`${API_URL}/auth/login/`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  },

  /**
   * Handle the callback after Microsoft authentication
   * @param {string} token - The access token from the callback
   * @returns {Promise<Object>}
   */
  handleCallback: async (token) => {
    localStorage.setItem('msalToken', token);
    return { success: true, token };
  },

  /**
   * Get the current user's information
   * @returns {Promise<Object>}
   */
  getUserInfo: async () => {
    const response = await fetch(`${API_URL}/auth/user-info/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  /**
   * Check if the user is authenticated
   * @returns {Promise<{authenticated: boolean, user: Object|null}>}
   */
  checkAuth: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/check-auth/`, {
        method: 'GET',
        credentials: 'include',
      });
      return response.json();
    } catch (error) {
      console.error('Error checking authentication:', error);
      return { authenticated: false };
    }
  },

  /**
   * Logout the user
   * @returns {Promise<{message: string}>}
   */
  logout: async () => {
    localStorage.removeItem('msalToken');
    const response = await fetch(`${API_URL}/auth/logout/`, {
      method: 'GET',
      credentials: 'include',
    });
    return response.json();
  },

  /**
   * Access a protected resource
   * @returns {Promise<Object>}
   */
  getProtectedResource: async () => {
    const response = await fetch(`${API_URL}/auth/protected/`, {
      method: 'GET',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Authentication required');
    }
    
    return response.json();
  },
};

export default AuthService;
