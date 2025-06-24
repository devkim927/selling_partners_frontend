// pjt/src/services/auth.js


import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/v1';


export const login = (formData) => {
  return axios.post(`${API_BASE}/login`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};


export const signup = (formData) => {
  return axios.post(`${API_BASE}/signup`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};
