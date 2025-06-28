import Footer from "../common/Footer";
import "../../styles/PageLayout.css";

function PageLayout({ children }) {
  return (
    <div className="page-container">
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;
