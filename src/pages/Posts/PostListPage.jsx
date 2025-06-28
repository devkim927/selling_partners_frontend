import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/posts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PageLayout from '../../components/layout/PageLayout';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('PostListPage: 게시글 목록 조회 시작');
    fetchPosts()
      .then((data) => {
        console.log('PostListPage: 게시글 목록 조회 성공', data);
        setPosts(data);
      })
      .catch((err) => {
        console.error('PostListPage: 게시글 목록 조회 실패', err);
        
        // 401 에러인 경우 특별 처리
        if (err.response?.status === 401) {
          setError('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
        } else if (err.response?.status === 404) {
          setError('게시글 목록 API가 아직 구현되지 않았습니다. 백엔드 개발자에게 문의해주세요.');
        } else {
          setError(err.message || '게시글 목록을 불러오는데 실패했습니다.');
        }
        
        // 401 에러가 아닌 경우에만 alert 표시
        if (err.response?.status !== 401) {
          alert(`게시글 목록 조회 실패: ${err.message || '알 수 없는 오류'}`);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <PageLayout>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>게시글 목록을 불러오는 중...</h2>
      </div>
    </PageLayout>
  );

  if (error) return (
    <PageLayout>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>오류가 발생했습니다</h2>
        <p>{error}</p>
        {error.includes('로그인이 필요한 서비스') ? (
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{
                background: '#5c27fe',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              로그인하기
            </button>
            <button 
              onClick={() => navigate('/')}
              style={{
                background: '#f0f0f0',
                color: '#333',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              홈으로 돌아가기
            </button>
          </div>
        ) : (
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#5c27fe',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        )}
      </div>
    </PageLayout>
  );

  return (
    <PageLayout>
      <div>
        <h2>프로젝트 목록</h2>
        {user?.role === 'COMPANY' && (
          <button 
            onClick={() => navigate('/posts/new')}
            style={{
              background: '#5c27fe',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            새 프로젝트 등록
          </button>
        )}
        
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>등록된 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {posts.map(post => (
              <li 
                key={post.id} 
                onClick={() => navigate(`/posts/${post.id}`)} 
                style={{ 
                  cursor: 'pointer', 
                  margin: '16px 0',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <strong style={{ fontSize: '1.2rem', color: '#333' }}>{post.title}</strong>
                <div style={{ marginTop: '8px', color: '#666' }}>
                  카테고리: {post.category} | 상태: {post.status ? '모집중' : '마감'}
                </div>
                <div style={{ marginTop: '12px', color: '#555' }}>{post.summary}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageLayout>
  );
} 