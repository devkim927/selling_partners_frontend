import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import "../../styles/PageLayout.css";

function PageLayout({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default PageLayout;
