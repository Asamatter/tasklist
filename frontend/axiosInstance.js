// axiosInstance.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://backend-production-7211.up.railway.app', // Update with your production URL
  timeout: 10000, // Adjust timeout as needed
});

export default instance;
