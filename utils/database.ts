import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const addClient = async (name: string, username: string, email: string, password: string) => {
  try {
    const response = await axios.post('http://10.0.0.147:8000/api/register/', {
      name,
      username,
      email,
      password,
    });
    console.log('Sending registration data:', { name, email, password });

    // If your API returns a token upon successful registration
    if (response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token); // Store the token
    }

    return response.data;  // The server's response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response);
      throw new Error(error.response?.data?.error || 'Registration failed');
    } else {
      console.error('General error:', error);
      throw new Error('Network Error');
    }
  }
};

// 'http://10.0.0.103:8000/api/login/'
// Function to validate user login
const validateClient = async (email: string, password: string) => {
  const url = 'http://10.0.0.147:8000/api/login/';
  const requestData = { email, password };

  console.log('Sending login request to:', url);
  console.log('Request data:', requestData);

  try {
    const response = await axios.post(url, requestData);
    console.log('Response data:', response.data);

    // Store the token in AsyncStorage
    const token = response.data.token;
    await AsyncStorage.setItem('userToken', token);

    return response.data; // The server's response with user data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Log the full error response for debugging
      console.error('Error configuration:', error.config); // Log request config
      if (error.response) {
        console.error('Login error response:', error.response);
        const errorMessage = error.response.data?.error || 'Login failed';
        throw new Error(errorMessage);
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up request: ' + error.message);
      }
    } else {
      console.error('General error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export { addClient, validateClient };

