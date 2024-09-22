import axios from 'axios';

// Function to add a user
const addClient = async (name: string, username: string, email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/register/', {
      name: name,
      username: username, // Include username
      email: email,
      password: password,
    });
    console.log('Sending registration data:', { name, email, password });

    return response.data;  // The server's response
  } catch (error) {
    // Log the complete error response for debugging
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
      throw new Error(error.response?.data?.error || 'Registration failed');
    } else {
      console.error('General error:', error);
      throw new Error('Network Error');
    }
  }
};

// Function to validate user login
const validateClient = async (email: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login/', {
      email,
      password,
    });
    console.log('Sending login data:', { email });

    return response.data; // The server's response with user data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error || 'Login failed');
    } else {
      throw new Error('Network Error');
    }
  }
};

export { addClient, validateClient };

