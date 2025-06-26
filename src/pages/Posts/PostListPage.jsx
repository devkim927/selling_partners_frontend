import React from 'react';
import { Link } from 'react-router-dom';

function PostListPage() {
  // 추후 posts를 API로 받아올 예정
  const posts = [];
  return (
    <div style={{ padding: 40 }}>
      <h2>게시글 목록</h2>
      <Link to="/posts/new">
        <button>게시글 작성</button>
      </Link>
      <ul>
        {posts.length === 0 ? (
          <li>게시글이 없습니다.</li>
        ) : (
          posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
export default PostListPage; 