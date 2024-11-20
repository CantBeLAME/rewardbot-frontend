
import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    ContentType: 'application/json',
  },
  withCredentials: true,
});

export const axiosCanvas = axios.create({
  baseURL: '/api/v1/',
  headers: {
    // 'Authorization': `Bearer ${process.env.REACT_APP_TEMP_ACCESS_CODE}`,
    'Content-Type': 'application/json',
  },
  timeout: 8000, 
  withCredentials: true,
});

// Create an Axios instance
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    ContentType: 'application/json',
  },
  withCredentials: true,
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers = [];

// Helper to retry failed requests after refresh
const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

// Add Axios interceptor
axiosAuth.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refreshing
        return new Promise((resolve) => {
          refreshSubscribers.push((newAccessToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            resolve(axiosAuth(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const { data } = await axios.post(`${BASE_URL}refresh`, {}, { withCredentials: true });
        const newAccessToken = data.accessToken;

        isRefreshing = false;
        onRefreshed(newAccessToken);

        // Update the failed request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        console.error('Refresh token failed:', refreshError);
        // Redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Reject all other errors
  }
);