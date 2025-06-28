import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPostDetail(id)
      .then(setPost)
      .catch(() => alert('게시글 조회 실패'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>로딩중...</div>;
  if (!post) return <div>게시글이 없습니다.</div>;

  return (
    <div style={{ padding: 40, background: '#f7f7fa', minHeight: '80vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(92,39,254,0.08)', padding: 32 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1, background: '#eee', minHeight: 200, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 이미지 미리보기 */}
            {post.thumbnailUrl && <img src={post.thumbnailUrl} alt="썸네일" style={{ maxWidth: '100%', maxHeight: '100%' }} />}
          </div>
          <div style={{ flex: 1 }}>
            <h2>{post.title}</h2>
            <div style={{ color: '#4caf50', fontWeight: 700, fontSize: 24 }}>{post.price.toLocaleString()} 원</div>
            <div style={{ margin: '8px 0', color: '#888' }}>{post.category}</div>
            <div style={{ margin: '16px 0' }}>{post.description}</div>
            <div style={{ margin: '16px 0' }}>상태: {post.status ? '모집중' : '마감'}</div>
            <div style={{ margin: '16px 0' }}>요약: {post.summary}</div>
            <div style={{ margin: '16px 0' }}>마감일: {post.deadline}</div>
            <div style={{ margin: '16px 0' }}>조회수: {post.views}</div>
            <div style={{ margin: '16px 0' }}>작성일: {post.createdAt}</div>
            {/* 역할별 분기 예시 */}
            {user?.role === 'COMPANY' && <button style={{ width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16 }}>프로젝트 수정</button>}
            {user?.role === 'PARTNER' && <button style={{ width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16 }}>제안서 보내기</button>}
            <div style={{ marginTop: 16, background: '#f5f5f5', borderRadius: 8, padding: 16, fontSize: 15 }}>{post.detail}</div>
          </div>
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <h3>상품 상세 정보</h3>
          {post.brochureUrl && <a href={post.brochureUrl} download style={{ display: 'block', marginBottom: 16, color: '#4caf50', textDecoration: 'none' }}>상품 소개서 다운로드(PDF)</a>}
        </div>
      </div>
    </div>
  );
} 