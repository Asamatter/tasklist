
import axios from 'axios';

const API_URL_PROD = 'https://backend-production-7211.up.railway.app/api';
const API_URL_LOCAL = 'http://127.0.0.1:8000/api';
const NODE_ENV = process.env.NODE_ENV || 'development'; 

const apiUrl = NODE_ENV === 'production' ? API_URL_PROD : API_URL_LOCAL;


const api = axios.create({
  baseURL: apiUrl,

});

export default api;
