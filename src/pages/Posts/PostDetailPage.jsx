import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostDetail } from '../../services/posts';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/layout/PageLayout';

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // 임시로 모의 데이터 사용 (백엔드 API가 준비되지 않은 경우)
    const mockPost = {
      id: parseInt(id),
      title: '웹 개발 프로젝트',
      description: 'React와 Spring Boot를 사용한 웹 애플리케이션 개발 프로젝트입니다. 프론트엔드는 React를 사용하고, 백엔드는 Spring Boot를 사용하여 RESTful API를 구현합니다.',
      summary: 'React와 Spring Boot를 사용한 웹 애플리케이션 개발',
      category: { displayName: 'IT/소프트웨어' },
      status: true,
      views: 15,
      deadline: '2024-07-15',
      createdAt: '2024-06-28T10:00:00Z',
      thumbnailUrl: null,
      brochureUrl: null,
      user: { id: 1, name: '테스트 사용자' }
    };
    
    setPost(mockPost);
    setLoading(false);
    
    // 실제 API 호출 (백엔드가 준비되면 주석 해제)
    // fetchPostDetail(id)
    //   .then(setPost)
    //   .catch((err) => {
    //     console.error('게시글 조회 실패:', err);
    //     setError('게시글을 불러오는데 실패했습니다.');
    //   })
    //   .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <PageLayout>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>게시글을 불러오는 중...</h2>
      </div>
    </PageLayout>
  );

  if (error) return (
    <PageLayout>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>오류가 발생했습니다</h2>
        <p>{error}</p>
      </div>
    </PageLayout>
  );

  if (!post) return (
    <PageLayout>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>게시글이 없습니다</h2>
      </div>
    </PageLayout>
  );

  return (
    <PageLayout>
      <div style={{ 
        maxWidth: 900, 
        margin: '0 auto', 
        background: '#fff', 
        borderRadius: 16, 
        boxShadow: '0 2px 16px rgba(92,39,254,0.08)', 
        padding: 32 
      }}>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* 썸네일 이미지 */}
          <div style={{ 
            flex: '1 1 300px', 
            background: '#f5f5f5', 
            minHeight: 200, 
            borderRadius: 8, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {post.thumbnailUrl ? (
              <img 
                src={post.thumbnailUrl} 
                alt="썸네일" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%',
                  objectFit: 'cover'
                }} 
              />
            ) : (
              <div style={{ color: '#999', fontSize: 16 }}>이미지 없음</div>
            )}
          </div>
          
          {/* 게시글 정보 */}
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ marginBottom: 16, color: '#333' }}>{post.title}</h2>
            
            <div style={{ marginBottom: 16 }}>
              <span style={{ 
                background: post.status ? '#4caf50' : '#f44336', 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: 20, 
                fontSize: 14, 
                fontWeight: 600 
              }}>
                {post.status ? '모집중' : '마감'}
              </span>
            </div>
            
            <div style={{ marginBottom: 16, color: '#666' }}>
              카테고리: {post.category?.displayName || post.category}
            </div>
            
            {post.summary && (
              <div style={{ 
                marginBottom: 16, 
                padding: 16, 
                background: '#f8f9fa', 
                borderRadius: 8,
                color: '#555'
              }}>
                <strong>요약:</strong> {post.summary}
              </div>
            )}
            
            {post.deadline && (
              <div style={{ marginBottom: 16, color: '#666' }}>
                마감일: {new Date(post.deadline).toLocaleDateString()}
              </div>
            )}
            
            <div style={{ marginBottom: 16, color: '#666' }}>
              조회수: {post.views || 0}
            </div>
            
            {post.createdAt && (
              <div style={{ marginBottom: 24, color: '#666' }}>
                작성일: {new Date(post.createdAt).toLocaleDateString()}
              </div>
            )}
            
            {/* 역할별 버튼 */}
            {user?.role === 'COMPANY' && post.user?.id === user?.id && (
              <button style={{ 
                width: '100%', 
                background: '#5c27fe', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 0', 
                fontWeight: 600, 
                fontSize: 16,
                marginBottom: 12,
                cursor: 'pointer'
              }}>
                프로젝트 수정
              </button>
            )}
            
            {user?.role === 'PARTNER' && (
              <button style={{ 
                width: '100%', 
                background: '#5c27fe', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 8, 
                padding: '12px 0', 
                fontWeight: 600, 
                fontSize: 16,
                cursor: 'pointer'
              }}>
                제안서 보내기
              </button>
            )}
          </div>
        </div>
        
        {/* 상세 내용 */}
        {post.description && (
          <div style={{ marginTop: 32 }}>
            <h3 style={{ marginBottom: 16, color: '#333' }}>상세 내용</h3>
            <div style={{ 
              background: '#f8f9fa', 
              borderRadius: 8, 
              padding: 24, 
              fontSize: 16,
              lineHeight: 1.6,
              color: '#333'
            }}>
              {post.description}
            </div>
          </div>
        )}
        
        {/* 브로셔 다운로드 */}
        {post.brochureUrl && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a 
              href={post.brochureUrl} 
              download 
              style={{ 
                display: 'inline-block',
                background: '#4caf50',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16
              }}
            >
              브로셔 다운로드 (PDF)
            </a>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 