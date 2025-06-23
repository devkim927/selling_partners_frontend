import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';


export const login = (formData) => {
  return axios.post(`${API_BASE}/login`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const signup = (formData) => {
  return axios.post(`${API_BASE}/signup`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
