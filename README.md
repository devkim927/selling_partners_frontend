# 🧑‍💼 Selling Partners Frontend

성과형 영업·고객발굴 플랫폼의 프론트엔드 레포지토리입니다.
React 기반으로 사용자 인증, 매칭, 유통 마켓 등의 기능 UI를 제공합니다.

---

## ✨ 프로젝트 개요

- **프로젝트 명:** 성과형 영업·고객발굴 플랫폼 (Selling Partners)
- **목표:** 기술력 있는 중소·강소기업과 다양한 영업 파트너(프리랜서, 지역 파트너 등)를 매칭하고 성과 기반으로 정산하는 B2B 오픈형 플랫폼 구축
- **개발 기간:** 20일
- **총 인원:** 기획 1명(김동환), 프론트 2명(이승훈, 김동현), 백엔드 2명(김대원, 임혜성) : 총 5명

---

## 🛠 기술 스택

| 영역       | 사용 기술                         |
| ---------- | --------------------------------- |
| 프론트엔드 | React, React Router, Tailwind CSS |
| 상태 관리  | Context API                       |
| 요청 처리  | Axios (예정)                      |
| 스타일링   | Tailwind CSS + Custom Classes     |

---

## 📁 폴더 구조 (예시)

```
src/
├── components/         # 공통 UI 컴포넌트 (Button, InputField 등)
├── pages/              # 라우트별 화면 (로그인, 회원가입 등)
│   └── Auth/
├── layouts/            # PageLayout 등 공통 레이아웃
├── routes/             # 라우터 설정
├── services/           # API 함수 모음 (예정)
├── contexts/           # AuthContext 등 전역 상태
├── hooks/              # 커스텀 훅들 (예: useForm)
├── App.js              # 진입점
```

---

## ✅ 구현 기능 (프론트 기준)

- [x] 회원가입 (역할별: 기업 / 파트너)
- [x] 로그인 (JWT 방식 예정)
- [x] 공통 컴포넌트(Button, Input, Select 등)
- [ ] 네비게이션 바 / 레이아웃 구성
- [ ] 기업 대시보드 / 파트너 대시보드
- [ ] 제안 / 계약 페이지
- [ ] 유통 마켓 (상품 등록, 구매)
- [ ] 입찰 알림 UI
- [ ] 관리자 화면 (리스트 및 통계)

---

## 🚀 실행 방법

### 1. 클론 및 설치

```bash
git clone https://github.com/your-username/selling-partners-frontend.git
cd selling-partners-frontend
npm install
```

### 2. 실행

```bash
npm start
```

---

## 📸 화면 예시

> 아래는 로그인 화면 구성 예시입니다.

![login-page](./public/screenshots/login-mockup.png)

---

## Commit 양식

| 구분        | 설명                                           |
| ----------- | ---------------------------------------------- |
| `feat:`     | 새로운 기능 추가                               |
| `fix:`      | 버그 수정                                      |
| `refactor:` | 리팩토링 (기능 변화 없음)                      |
| `style:`    | 코드 포맷, 세미콜론 등 비즈니스 로직 변화 없음 |
| `chore:`    | 빌드 설정, 패키지 설치 등                      |
| `docs:`     | 문서 수정 (README 등)                          |

## 👨‍💻 개발자 정보 (프론트 기준)

| 이름   | 담당 역할                              |
| ------ | -------------------------------------- |
| 김동환 | 홈화면, 로그인, 회원가입, 전체 UI 구성 |
| 이승훈 | 기업 대시보드, 공고 관리, 계약 UI 구현 |
| 김동현 | 파트너 마이페이지, 관리자 UI 구성      |

---

## 📌 백엔드 연동 시 API 문서 및 통신 구조는 `/services` 폴더에서 별도로 관리 예정입니다.

## 📄 라이선스

MIT
