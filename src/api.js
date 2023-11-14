import axios from 'axios';
import localhost from 'react-native-localhost';

export const API_URL = `http://${localhost}:8080/`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});