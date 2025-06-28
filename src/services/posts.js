import axios from 'axios';

// 게시글 목록 조회
export const fetchPosts = () =>
  axios.get('/api/v1/projects', { withCredentials: true }).then(res => res.data);

// 게시글 상세 조회
export const fetchPostDetail = (id) =>
  axios.get(`/api/v1/projects/${id}`, { withCredentials: true }).then(res => res.data);

// 게시글 작성
export const createPost = (formData) =>
  axios.post('/api/v1/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  }).then(res => res.data); 