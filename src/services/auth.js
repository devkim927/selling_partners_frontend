// pjt/src/services/auth.js

import axios from 'axios';
import './axiosConfig';

// 프록시를 사용하여 CORS 문제 해결
const API_BASE = '';

export const login = (formData) => {
  return axios.post('/api/v1/login', formData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};

export const signup = (formData) => {
  return axios.post('/api/v1/signup', formData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};