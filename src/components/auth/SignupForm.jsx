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

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.password || !formData.email) {
      alert('아이디, 비밀번호, 이메일은 필수입니다.');
      setIsLoading(false);
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
      console.log('Signup response:', response); // 디버깅용
      alert('회원가입 성공!');
      
      // 폼 초기화
      setFormData({
        username: '',
        password: '',
        email: '',
        role: '',
        phoneNumber: '',
        name: '',
      });
    } catch (err) {
      console.error('Signup error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      });
      
      let errorMessage = '서버 오류';
      
      if (err.code === 'ERR_NETWORK') {
        errorMessage = '네트워크 오류: 백엔드 서버가 실행 중인지 확인해주세요.';
      } else if (err.response?.status === 400) {
        errorMessage = `입력 오류: ${err.response.data?.message || '잘못된 입력입니다.'}`;
      } else if (err.response?.status === 409) {
        errorMessage = '이미 존재하는 사용자입니다.';
      } else if (err.response?.status === 500) {
        errorMessage = '서버 내부 오류가 발생했습니다.';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      alert(`회원가입 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
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
      <InputField type="text" name="username" value={formData.username} onChange={handleChange} placeholder="아이디(사용자명)" required /><br />
      <InputField type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" required /><br />
      <InputField type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일" required /><br />
      <SelectField name="role" value={formData.role} onChange={handleChange} options={roleOptions} /><br />
      <InputField type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="전화번호" /><br />
      <InputField type="text" name="name" value={formData.name} onChange={handleChange} placeholder="이름" /><br />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '처리 중...' : '회원가입'}
      </Button>
    </form>
  );
}

export default SignupForm;