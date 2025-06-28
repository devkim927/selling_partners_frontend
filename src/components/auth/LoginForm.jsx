// pjt/src/components/auth/LoginForm.jsx

import { useState } from "react";
import { login } from "../../services/auth";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log('로그인 응답:', res.data); // 디버깅용
      setUser(res.data);
      alert('로그인 성공!');
      navigate('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="username"
        placeholder="아이디(사용자명)"
        value={formData.username}
        onChange={handleChange}
      /><br />

      <InputField
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      /><br />
      
      <Button type="submit">로그인</Button>
    </form>
  );
}

export default LoginForm;
