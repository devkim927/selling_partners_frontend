import React from 'react';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { id } = useParams();
  // 추후 API로 게시글 상세를 받아올 예정
  const post = {
    id,
    title: '도난방지 창틀',
    price: 300000,
    category: '보안/경비',
    description: '강철로 제작된 도난방지 창틀',
    detail: '5미터당 300,000원의 창틀에 대해 창호제작 업체 가능\n전국 어디든 설치 가능\n대량 설치 환영',
    imageUrl: '',
    pdfUrl: '',
  };
  return (
    <div style={{ padding: 40, background: '#f7f7fa', minHeight: '80vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(92,39,254,0.08)', padding: 32 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ flex: 1, background: '#eee', minHeight: 200, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* 이미지 미리보기 */}
            <span style={{ color: '#aaa' }}>이미지</span>
          </div>
          <div style={{ flex: 1 }}>
            <h2>{post.title}</h2>
            <div style={{ color: '#4caf50', fontWeight: 700, fontSize: 24 }}>{post.price.toLocaleString()} 원</div>
            <div style={{ margin: '8px 0', color: '#888' }}>{post.category}</div>
            <div style={{ margin: '16px 0' }}>{post.description}</div>
            <button style={{ width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16 }}>영업 / 고객 확보 제안하기</button>
            <div style={{ marginTop: 16, background: '#f5f5f5', borderRadius: 8, padding: 16, fontSize: 15 }}>{post.detail}</div>
          </div>
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <h3>상품 상세 정보</h3>
          <a href={post.pdfUrl} target="_blank" rel="noopener noreferrer">상품 소개서 다운로드(PDF)</a>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage; 