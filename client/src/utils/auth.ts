import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Decode the token and return user data
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    // Check if a valid token exists
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true; // No expiration field, consider expired
      return decoded.exp * 1000 < Date.now(); // Check if expired
    } catch (err) {
      return true; // If there's an error decoding, consider expired
    }
  }

  getToken(): string | null {
    // Get the token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken: string) {
    // Store the token in localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/'); // Redirect to home page
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('id_token');
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();