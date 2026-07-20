import axios from 'axios';

/**
 * Axios instance configuration
 * Sets up the base URL for the backend and a default timeout.
 */
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 5000,
});

/**
 * Fetches the latest emergency data from the backend.
 * 
 * @returns {Promise<Object>} The latest emergency data payload.
 * @throws {Error} Throws a readable error if the request fails.
 */
export async function getLatestEmergency() {
  try {
    const response = await api.get('/latest-emergency');
    return response.data;
  } catch (error) {
    // Check if the error is from a server response (e.g., 404, 500)
    if (error.response) {
      throw new Error(`Server Error (${error.response.status}): Failed to fetch the latest emergency.`);
    } 
    // Check if the request was made but no response was received (e.g., network failure, timeout)
    else if (error.request) {
      throw new Error('Network Error: No response from the server. Please check if the backend is running.');
    } 
    // Fallback for other errors (e.g., request setup issues)
    else {
      throw new Error(`Unexpected Error: ${error.message}`);
    }
  }
}

export default api;