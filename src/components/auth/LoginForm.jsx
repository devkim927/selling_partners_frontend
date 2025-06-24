// pjt/src/components/auth/LoginForm.jsx

import { useState } from "react";
import { login } from "../../services/auth";
import InputField from "../common/InputField";
import Button from "../common/Button";

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
      const token = res.data.token;
      localStorage.setItem('accessToken', token);
      alert('로그인 성공!');
      console.log('응답 데이터:', res.data);
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
