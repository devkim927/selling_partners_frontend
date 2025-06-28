import React from 'react';
import PostForm from '../../components/posts/PostForm';
import { useNavigate } from 'react-router-dom';

export default function PostCreatePage() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 40 }}>
      <h2>프로젝트 등록</h2>
      <PostForm onSuccess={() => navigate('/posts')} />
    </div>
  );
} 