import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from '../../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout(); // AuthContext의 logout 함수 사용
    navigate('/');
  };

  // 로딩 중일 때는 인증 버튼들을 숨김
  if (loading) {
    return (
      <nav className="navbar">
        <div className="navbar__logo" onClick={() => navigate('/')}>Selling Partners</div>
        <ul className="navbar__menu">
          <li><button className="navbar__btn orange">유통 정보 둘러보기</button></li>
          <li><button className="navbar__btn purple" onClick={() => navigate('/posts')}>파트너 매칭 시작하기</button></li>
          <li>영업기술 강의</li>
          <li>회사 소개</li>
          <li>협업 문의</li>
          <li>Link</li>
        </ul>
        <div className="navbar__auth">
          <div style={{ color: '#666', fontSize: '0.9rem' }}>로딩 중...</div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>Selling Partners</div>
      <ul className="navbar__menu">
        <li><button className="navbar__btn orange">유통 정보 둘러보기</button></li>
        <li><button className="navbar__btn purple" onClick={() => navigate('/posts')}>파트너 매칭 시작하기</button></li>
        <li>영업기술 강의</li>
        <li>회사 소개</li>
        <li>협업 문의</li>
        <li>Link</li>
      </ul>
      <div className="navbar__auth">
        {user ? (
          <>
            {user.role === 'COMPANY' && (
              <button className="navbar__btn purple" onClick={() => navigate('/posts/new')}>제품소개하기</button>
            )}
            {user.role === 'PARTNER' && (
              <button className="navbar__btn purple" onClick={() => navigate('/posts/new')}>나를 소개하기</button>
            )}
            <button className="navbar__btn login" onClick={() => navigate('/mypage')}>마이페이지</button>
            <button className="navbar__btn login" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button className="navbar__btn login" onClick={() => navigate('/login')}>로그인</button>
            <button className="navbar__btn signup" onClick={() => navigate('/signup')}>회원가입</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 