import axios from 'axios';

const API_URL = 'http://localhost:8000';

class AuthService {
  // Store JWT token in localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Get JWT token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Remove JWT token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  }

  // Get user data from token
  getUserData() {
    const token = this.getToken();
    if (!token) return null;
    
    // Decode JWT payload (middle part of token)
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.getToken() !== null;
  }

  // Login user
  async login(email, password) {
    const response = await axios.post(`${API_URL}/manager/login`, {
      email,
      password
    });
    
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response.data;
  }

  // Register user
  async register(email, username, password) {
    const response = await axios.post(`${API_URL}/manager/register`, {
      email,
      username,
      password
    });
    
    return response.data;
  }

  // Logout user
  async logout() {
    const token = this.getToken();
    if (token) {
      try {
        await axios.post(
          `${API_URL}/manager/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Logout error', error);
      }
    }
    this.removeToken();
  }

  // Get authenticated axios instance with token in header
  getAuthAxios() {
    const token = this.getToken();
    return axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

export default new AuthService();
