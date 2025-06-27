// pjt/src/services/axiosConfig.js

import axios from 'axios';

// 기본 설정
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '';

const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

axios.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  console.log('Request URL:', config.url);
  console.log('Request Method:', config.method);
  console.log('XSRF-TOKEN:', csrfToken);
  console.log('All Cookies:', document.cookie);
  
  if (csrfToken) {
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  } else {
    console.warn('XSRF-TOKEN not found, check backend');
  }
  
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    console.error('Error config:', error.config);
    console.error('Error response:', error.response);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - check if backend server is running');
    } else if (error.response?.status === 403) {
      console.error('CORS error or CSRF token issue');
    } else if (error.response?.status === 404) {
      console.error('API endpoint not found');
    } else if (error.response?.status === 500) {
      console.error('Server internal error');
    }
    
    return Promise.reject(error);
  }
);

export { getCsrfToken };