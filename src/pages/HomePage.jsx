// pjt/src/pages/HomePage.jsx

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '30px' }}>
      <h1>성과형 영업·고객발굴 플랫폼</h1>
      <p>파트너와 기업을 연결하는 B2B 플랫폼</p>

      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button style={{ marginRight: '10px' }}>로그인</button>
        </Link>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
