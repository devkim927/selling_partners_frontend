import React from 'react';
import PostForm from '../../components/posts/PostForm';

function PostCreatePage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7fa' }}>
      <PostForm />
    </div>
  );
}

export default PostCreatePage; 