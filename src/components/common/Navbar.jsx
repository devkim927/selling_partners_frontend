import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
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
        <button className="navbar__btn login" onClick={() => navigate('/login')}>로그인</button>
        <button className="navbar__btn signup" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </nav>
  );
}

export default Navbar; 