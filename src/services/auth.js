// pjt/src/services/auth.js

import axios from 'axios';
import './axiosConfig';

// 백엔드 서버 주소
const API_BASE = 'http://localhost:8080';

export const login = (formData) => {
  // 로그인 후 유저 정보 반환 (role 포함)
  return axios.post(`${API_BASE}/api/v1/login`, formData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};

export const signup = (formData) => {
  return axios.post(`${API_BASE}/api/v1/signup`, formData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
};