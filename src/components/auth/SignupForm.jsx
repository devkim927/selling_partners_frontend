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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adjustedRole =
      formData.role === 'partner' ? 'ROLE_PARTNER' :
      formData.role === 'company' ? 'ROLE_COMPANY' :
      'ROLE_GUEST';

    const dataToSend = {
      ...formData,
      role: adjustedRole,
    };

    try {
      await signup(dataToSend);
      alert('회원가입 성공!');
    } catch (err) {
      alert('회원가입 실패');
    }
  };

  const roleOptions = [
    { value: '', label: '-- 역할 선택 --' },
    { value: 'partner', label: '영업 파트너' },
    { value: 'company', label: '기업' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <InputField 
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="아이디(사용자명)"
      /><br />

      <InputField 
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
      /><br />
      
      <InputField 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일"
      /><br />

      <SelectField 
        name="role"
        value={formData.role}
        onChange={handleChange}
        options={roleOptions}
      /><br />

      <InputField 
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="전화번호"
      /><br />

      <InputField 
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름"
      /><br />

      <Button type="submit">회원가입</Button>
    </form>
  );
}

export default SignupForm;
