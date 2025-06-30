import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/layout/PageLayout';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // 실제 API 호출
    fetchPosts()
      .then((posts) => {
        console.log('게시글 목록 응답:', posts);
        setPosts(posts || []);
      })
      .catch((err) => {
        console.error('게시글 목록 조회 실패:', err);
        setError('게시글 목록을 불러오는데 실패했습니다.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>게시글을 불러오는 중...</h2>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ color: '#333', margin: 0 }}>프로젝트 목록</h1>
          {user?.role === 'COMPANY' && (
            <Link 
              to="/posts/new" 
              style={{
                background: '#5c27fe',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16
              }}
            >
              게시글 작성
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 16px rgba(92,39,254,0.08)'
          }}>
            <h3 style={{ color: '#666', marginBottom: 16 }}>등록된 게시글이 없습니다</h3>
            <p style={{ color: '#999' }}>첫 번째 게시글을 작성해보세요!</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: 24 
          }}>
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to={`/posts/${post.id}`}
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div style={{ 
                  background: '#fff', 
                  borderRadius: 16, 
                  boxShadow: '0 2px 16px rgba(92,39,254,0.08)', 
                  padding: 24,
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 24px rgba(92,39,254,0.12)'
                  }
                }}>
                  {/* 썸네일 이미지 */}
                  <div style={{ 
                    width: '100%', 
                    height: 200, 
                    background: '#f5f5f5', 
                    borderRadius: 8, 
                    marginBottom: 16,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {post.thumbnailUrl ? (
                      <img 
                        src={post.thumbnailUrl} 
                        alt="썸네일" 
                        style={{ 
                          width: '100%', 
                          height: '100%',
                          objectFit: 'cover'
                        }} 
                      />
                    ) : (
                      <div style={{ color: '#999', fontSize: 14 }}>이미지 없음</div>
                    )}
                  </div>

                  {/* 게시글 정보 */}
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ 
                        background: post.status ? '#4caf50' : '#f44336', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: 12, 
                        fontSize: 12, 
                        fontWeight: 600 
                      }}>
                        {post.status ? '모집중' : '마감'}
                      </span>
                    </div>
                    
                    <strong style={{ 
                      fontSize: '1.2rem', 
                      color: '#333',
                      display: 'block',
                      marginBottom: 8,
                      lineHeight: 1.4
                    }}>
                      {post.title}
                    </strong>
                    
                    <div style={{ 
                      marginBottom: 8, 
                      color: '#666', 
                      fontSize: 14 
                    }}>
                      카테고리: {post.category?.displayName || post.category}
                    </div>
                    
                    {post.summary && (
                      <div style={{ 
                        marginBottom: 12, 
                        color: '#555',
                        fontSize: 14,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.summary}
                      </div>
                    )}
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      fontSize: 12,
                      color: '#999'
                    }}>
                      <span>조회수: {post.views || 0}</span>
                      {post.createdAt && (
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
} 