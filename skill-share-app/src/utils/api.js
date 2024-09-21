const BASE_URL = 'http://localhost:5000/api/users'; // Adjust the base URL to match your backend

// Helper function to make requests with authentication
export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Function to register a new user
export const registerUser = async (email, password, name, skills) => {
  try {
    const response = await fetchWithAuth('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, skills }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await fetchWithAuth('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      localStorage.setItem('token', response.token); // Store the token
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Function to get user profile
export const getUserProfile = async () => {
  return await fetchWithAuth('/profile', {
    method: 'GET',
  });
};

// Function to update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetchWithAuth('/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });

    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Function to log out a user
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove token from local storage
};
