import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

console.log("API: "+API_URL)
export default axios.create({
  baseURL: `${API_URL}/api/v1`,
});

export const axiosPrivate = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
