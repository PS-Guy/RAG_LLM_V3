import axios from "axios";

// Get API key and base URL from environment variables
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json", // Default for POST requests
  },
});

// API methods
export const fetchConfig = async () => {
  try {
    const response = await api.get("/config");
    return response.data;
  } catch (error) {
    console.error("Error fetching config:", error.message);
    throw error; // Let the caller handle the error
  }
};

export const updateConfig = async (config) => {
  try {
    const response = await api.post("/config", config);
    return response.data;
  } catch (error) {
    console.error("Error updating config:", error.message);
    throw error;
  }
};

// Export the api instance for custom requests if needed
export default api;