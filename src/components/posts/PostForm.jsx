import React, { useState } from 'react';
import { createPost } from '../../services/posts';
import { useNavigate } from 'react-router-dom';

// 백엔드 Category enum에 맞춘 옵션들
const CATEGORY_OPTIONS = [
  { value: '', label: '카테고리 선택' },
  { value: 'IT_SOFTWARE', label: 'IT/소프트웨어' },
  { value: 'DESIGN_CREATIVE', label: '디자인/영상/콘텐츠' },
  { value: 'MANUFACTURING', label: '제조/기계/부품' },
  { value: 'CONSTRUCTION', label: '건축/토목/도시개발' },
  { value: 'CONSULTING', label: '경영/컨설팅' },
  { value: 'EDUCATION', label: '교육/강의' },
  { value: 'HEALTHCARE', label: '헬스케어/의료' },
  { value: 'MARKETING_SALES', label: '마케팅/영업' },
  { value: 'DISTRIBUTION_TRADE', label: '유통/무역' },
  { value: 'ENVIRONMENT_ENERGY', label: '환경/에너지' },
  { value: 'SAFETY_MANAGEMENT', label: '안전/방재/시설관리' },
];

function PostForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    summary: '',
    category: '',
    deadline: '',
    thumbnail: null,
    brochure: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // 백엔드 ProjectCreateRequest 형식에 맞춰 데이터 추가
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('summary', form.summary);
      formData.append('category', form.category);
      formData.append('deadline', form.deadline);
      
      if (form.thumbnail) {
        formData.append('thumbnail', form.thumbnail);
      }
      if (form.brochure) {
        formData.append('brochure', form.brochure);
      }

      console.log('제출 데이터:', Object.fromEntries(formData));
      
      const response = await createPost(formData);
      console.log('게시글 작성 성공:', response);
      
      alert('게시글 작성이 완료되었습니다!');
      navigate('/posts'); // 게시글 목록으로 이동
      
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      
      // 더 자세한 에러 정보 출력
      if (error.response) {
        console.error('에러 상태:', error.response.status);
        console.error('에러 데이터:', error.response.data);
        console.error('에러 헤더:', error.response.headers);
        
        if (error.response.status === 401) {
          alert('로그인이 필요합니다. 로그인 후 다시 시도해주세요.');
        } else if (error.response.status === 403) {
          alert('권한이 없습니다. COMPANY 역할로 로그인해주세요.');
        } else if (error.response.status === 400) {
          alert('입력 데이터가 올바르지 않습니다. 다시 확인해주세요.');
        } else {
          alert(`게시글 작성에 실패했습니다. (${error.response.status})`);
        }
      } else if (error.request) {
        console.error('요청은 보냈지만 응답이 없음:', error.request);
        alert('서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
      } else {
        console.error('요청 설정 중 에러:', error.message);
        alert('요청 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      background: '#fff', 
      borderRadius: 16, 
      boxShadow: '0 2px 16px rgba(92,39,254,0.08)', 
      padding: 32, 
      minWidth: 400, 
      maxWidth: 600 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 8, color: '#333' }}>게시글 작성</h2>
      <div style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>
        영업 / 고객확보를 위해 제안하세요!
      </div>
      
      {/* 제목 */}
      <div style={{ marginBottom: 16 }}>
        <input 
          name="title" 
          placeholder="게시글 제목" 
          value={form.title} 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            fontSize: 16
          }} 
          required 
        />
      </div>

      {/* 요약 */}
      <div style={{ marginBottom: 16 }}>
        <input 
          name="summary" 
          placeholder="게시글 요약 (300자 이내)" 
          value={form.summary} 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            fontSize: 16
          }} 
          maxLength={300}
          required 
        />
      </div>

      {/* 카테고리와 마감일 */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <select 
          name="category" 
          value={form.category} 
          onChange={handleChange} 
          style={{ 
            flex: 1, 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            fontSize: 16
          }} 
          required
        >
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <input 
          name="deadline" 
          type="date" 
          value={form.deadline} 
          onChange={handleChange} 
          style={{ 
            flex: 1, 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            fontSize: 16
          }} 
          required 
        />
      </div>

      {/* 썸네일 이미지 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 14, color: '#555', display: 'block', marginBottom: 8 }}>
          썸네일 이미지 첨부
        </label>
        <input 
          name="thumbnail" 
          type="file" 
          accept="image/*" 
          onChange={handleChange} 
          style={{ 
            width: '100%',
            padding: '8px',
            border: '1px solid #e0e0e0',
            borderRadius: 8
          }} 
        />
      </div>

      {/* 브로셔 PDF */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 14, color: '#555', display: 'block', marginBottom: 8 }}>
          브로셔 PDF 첨부
        </label>
        <input 
          name="brochure" 
          type="file" 
          accept="application/pdf" 
          onChange={handleChange} 
          style={{ 
            width: '100%',
            padding: '8px',
            border: '1px solid #e0e0e0',
            borderRadius: 8
          }} 
        />
      </div>

      {/* 상세 내용 */}
      <div style={{ marginBottom: 24 }}>
        <textarea 
          name="description" 
          placeholder="게시글 상세 내용" 
          value={form.description} 
          onChange={handleChange} 
          style={{ 
            width: '100%', 
            minHeight: 120, 
            padding: '12px 16px', 
            border: '1px solid #e0e0e0',
            borderRadius: 8,
            fontSize: 16,
            resize: 'vertical'
          }} 
          required 
        />
      </div>

      {/* 제출 버튼 */}
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          width: '100%', 
          background: isLoading ? '#ccc' : '#5c27fe', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 8, 
          padding: '16px 0', 
          fontWeight: 600, 
          fontSize: 16,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s'
        }}
      >
        {isLoading ? '처리 중...' : '게시글 작성 완료'}
      </button>
    </form>
  );
}

export default PostForm; 