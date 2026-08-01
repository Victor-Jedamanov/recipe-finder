import Header from "../components/Header";
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <>
      <title>Page Not Found</title>

      <Header />

      <div className="not-found-page">
        Page Not Found
      </div>
    </>
  );
}

export default NotFoundPage;