import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    // Send a POST request
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    // (authentication failed)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      throw new Error(`Error: ${errorData.message}`); // Show error message
    }

    // Parse and return
    const data = await response.json();
    return data; // Return JWT token
  } catch (err) {
    console.error('Login error: ', err);
    return Promise.reject('Authentication failed');
  }
}

export { login };
