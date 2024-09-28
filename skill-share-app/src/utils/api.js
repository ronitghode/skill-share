const BASE_URL = 'http://localhost:5000/api/users'; // Adjust the base URL to match your backend

// Helper function to make requests with authentication
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; // Include token in headers if available
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw error for non-200 responses
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to register a new user
export const registerUser = async (email, password, name, skills) => {
  try {
    const response = await fetchWithAuth('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, skills }), // Send user data
    });

    return response; // Return the response from the server
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await fetchWithAuth('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }), // Send login credentials
    });

    if (response.token) {
      localStorage.setItem('token', response.token); // Store the token in local storage
    }
    return response; // Return the server's response
  } catch (error) {
    console.error('Error logging in:', error);
    throw error; // Rethrow the error
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  return await fetchWithAuth('/profile', {
    method: 'GET', // Use GET request to fetch user profile
  });
};

// Function to update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetchWithAuth('/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData), // Send updated profile data
    });

    return response; // Return the server's response
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error; // Rethrow the error
  }
};

// Function to log out a user
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from local storage
};
