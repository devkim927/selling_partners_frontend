// pjt/src/services/axiosConfig.js

import axios from 'axios';

axios.defaults.withCredentials = true;

const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

axios.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  console.log('XSRF-TOKEN:', csrfToken);
  console.log('All Cookies:', document.cookie);
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken; // 개별 요청에 설정
  } else {
    console.warn('XSRF-TOKEN not found, check backend');
  }
  return config;
}, (error) => {
  console.error('Interceptor error:', error);
  return Promise.reject(error);
});

export { getCsrfToken };