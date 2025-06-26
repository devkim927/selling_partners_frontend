import React, { useState } from 'react';

const INDUSTRY_OPTIONS = [
  { value: '', label: '선택' },
  { value: 'security', label: '보안/경비' },
  { value: 'manufacturing', label: '제조' },
  { value: 'it', label: 'IT' },
  { value: 'marketing', label: '마케팅' },
  // 필요시 추가
];

function PostForm() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    industry: '',
    image: null,
    pdf: null,
    detail: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    // TODO: API 연동
    console.log('제출 데이터:', ...formData);
    alert('게시글 작성 완료 (API 연동 필요)');
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(92,39,254,0.08)', padding: 32, minWidth: 400, maxWidth: 500 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 8 }}>게시글 작성</h2>
      <div style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>영업 / 고객확보를 위해 제안하세요!</div>
      <input name="title" placeholder="게시글 제목" value={form.title} onChange={handleChange} style={{ width: '100%', marginBottom: 12, padding: 8 }} required />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input name="price" type="number" placeholder="금액" value={form.price} onChange={handleChange} style={{ flex: 1, padding: 8 }} required />
        <select name="industry" value={form.industry} onChange={handleChange} style={{ flex: 1, padding: 8 }} required>
          {INDUSTRY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, color: '#555' }}>상품 이미지 첨부</label>
        <input name="image" type="file" accept="image/*" onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, color: '#555' }}>상품 설명 PDF 첨부</label>
        <input name="pdf" type="file" accept="application/pdf" onChange={handleChange} style={{ width: '100%' }} />
      </div>
      <textarea name="detail" placeholder="게시글 상세 내용" value={form.detail} onChange={handleChange} style={{ width: '100%', minHeight: 80, marginBottom: 16, padding: 8 }} required />
      <button type="submit" style={{ width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 600, fontSize: 16 }}>게시글 작성 완료</button>
    </form>
  );
}

export default PostForm; 