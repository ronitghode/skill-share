// src/hooks/useAuth.js
const useAuth = () => {
  const token = localStorage.getItem('token'); // Check for the token in local storage
  return !!token; // Return true if the token exists, otherwise false
};

export default useAuth;
