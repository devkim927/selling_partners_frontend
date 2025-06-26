// pjt/src/pages/Auth/LoginPage.jsx

import PageLayout from "../../components/layout/PageLayout";
import LoginForm from "../../components/auth/LoginForm";
import "../../styles/LoginPage.css";

function LoginPage() {
  return (
    <PageLayout>
      <div className="login-container">
        <LoginForm/>
      </div>
    </PageLayout>
  );
}

export default LoginPage;
