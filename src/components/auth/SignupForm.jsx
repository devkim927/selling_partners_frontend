// pjt/src/components/auth/SignupForm.jsx


import { useState } from "react";
import { signup } from "../../services/auth";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import Button from "../common/Button";

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: '',
    phoneNumber: '',
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email) {
      alert('아이디, 비밀번호, 이메일은 필수입니다.');
      return;
    }

    const adjustedRole =
      formData.role === 'partner' ? 'PARTNER' :
      formData.role === 'company' ? 'COMPANY' :
      'GUEST'; 

    const dataToSend = {
      username: formData.username,
      password: formData.password,
      role: adjustedRole, // 백엔드 enum에 맞춘 값
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      name: formData.name,
    };

    console.log('Sending data:', dataToSend); // 디버깅용

    try {
      const response = await signup(dataToSend);
      alert('회원가입 성공!');
      console.log('Signup response:', response); // 디버깅용
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message); // 에러 로깅
      alert(`회원가입 실패: ${err.response?.data?.message || '서버 오류'}`);
    }
  };

  // 역할 옵션 (UI는 그대로, 변환은 handleSubmit에서)
  const roleOptions = [
    { value: '', label: '-- 역할 선택 --' },
    { value: 'partner', label: '영업 파트너' },
    { value: 'company', label: '기업' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <InputField type="text" name="username" value={formData.username} onChange={handleChange} placeholder="아이디(사용자명)" /><br />
      <InputField type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" /><br />
      <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일" /><br />
      <SelectField name="role" value={formData.role} onChange={handleChange} options={roleOptions} /><br />
      <InputField type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="전화번호" /><br />
      <InputField type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" /><br />
      <Button type="submit">회원가입</Button>
    </form>
  );
}

export default SignupForm;