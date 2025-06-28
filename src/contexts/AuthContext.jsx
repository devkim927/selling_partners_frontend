import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user: { id, name, email, role, ... }
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  // 페이지 로드 시 세션 확인 (백엔드 구현 시 활성화)
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // 백엔드에서 세션 확인 API 구현 시 활성화
      const response = await fetch('/api/v1/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        // 세션 정보를 로컬 스토리지에도 백업 저장
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        // 세션 확인 실패 시 로컬 스토리지에서 복원 (임시 해결책)
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            console.error('사용자 정보 파싱 오류:', error);
            localStorage.removeItem('user');
          }
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.log('세션 확인 실패, 로컬 스토리지에서 복원:', error);
      // 네트워크 오류 시 로컬 스토리지에서 복원
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('사용자 정보 파싱 오류:', error);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보를 상태와 로컬 스토리지에 저장하는 함수
  const setUserAndSave = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const logout = async () => {
    setUserAndSave(null);
    
    // 백엔드 로그아웃 API 호출
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.log('로그아웃 API 호출 실패:', error);
      // API 호출 실패해도 로컬 상태는 정리됨
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser: setUserAndSave, 
      loading, 
      logout,
      checkSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// 로그인 상태 전역 관리 할거임