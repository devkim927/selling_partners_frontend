import React from 'react';
import PostForm from '../../components/posts/PostForm';
import PageLayout from '../../components/layout/PageLayout';

export default function PostCreatePage() {
  return (
    <PageLayout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        padding: '20px'
      }}>
        <PostForm />
      </div>
    </PageLayout>
  );
} 