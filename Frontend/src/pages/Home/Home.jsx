import { Link } from 'react-router-dom';

const homeStyles = `
  .home-page {
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .home-page *,
  .home-page *::before,
  .home-page *::after {
    box-sizing: border-box;
  }

  .home-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    background-color: #ffffff;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }

  .home-brand {
    margin: 0;
    max-width: 520px;
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
  }

  .home-nav {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 1px solid transparent;
  }

  .home-btn-login {
    background-color: #ffffff;
    color: #1a56db;
    border-color: #1a56db;
  }

  .home-btn-login:hover {
    background-color: #f0f5ff;
  }

  .home-btn-register {
    background-color: #1a56db;
    color: #ffffff;
    border-color: #1a56db;
  }

  .home-btn-register:hover {
    background-color: #1648c0;
  }

  .home-main {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 48px;
    gap: 40px;
  }

  .home-content {
    flex: 0 0 55%;
    max-width: 55%;
    padding-right: 24px;
  }

  .home-title {
    margin: 0 0 24px;
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    line-height: 1.25;
  }

  .home-description {
    margin: 0 0 24px;
    font-size: 16px;
    color: #4b5563;
    line-height: 1.7;
  }

  .home-tagline {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #1a56db;
    line-height: 1.5;
  }

  .home-illustration {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 360px;
  }

  .home-illustration-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 480px;
    min-height: 320px;
    padding: 48px 32px;
    background-color: #eef2f7;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  }

  .home-illustration-text {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: #6b7280;
    text-align: center;
    line-height: 1.5;
  }

  @media (max-width: 1024px) {
    .home-header {
      padding: 20px 32px;
    }

    .home-main {
      padding: 40px 32px;
    }

    .home-title {
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    .home-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 20px 24px;
    }

    .home-brand {
      max-width: none;
      font-size: 14px;
    }

    .home-nav {
      width: 100%;
    }

    .home-btn {
      flex: 1;
    }

    .home-main {
      flex-direction: column;
      align-items: stretch;
      padding: 32px 24px;
      gap: 32px;
    }

    .home-content {
      flex: none;
      max-width: none;
      padding-right: 0;
    }

    .home-title {
      font-size: 26px;
    }

    .home-description {
      font-size: 15px;
    }

    .home-illustration {
      min-height: 240px;
    }

    .home-illustration-card {
      min-height: 240px;
      padding: 32px 24px;
    }
  }

  @media (max-width: 480px) {
    .home-title {
      font-size: 22px;
    }

    .home-nav {
      flex-direction: column;
    }

    .home-btn {
      width: 100%;
    }
  }
`;

function Home() {
  return (
    <div className="home-page">
      <style>{homeStyles}</style>

      <header className="home-header">
        <h1 className="home-brand">AI-Based Application Maintenance and Support Workbench</h1>
        <nav className="home-nav">
          <Link to="/login" className="home-btn home-btn-login">Login</Link>
          <Link to="/register" className="home-btn home-btn-register">Register</Link>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-content">
          <h2 className="home-title">AI-Based Application Maintenance and Support Workbench</h2>
          <p className="home-description">
            An intelligent support platform that helps maintenance teams manage incidents,
            analyze application logs, identify recurring issues, recommend AI-powered solutions,
            and automatically generate knowledge articles to improve resolution speed and
            operational efficiency.
          </p>
          <p className="home-tagline">Smarter Support. Faster Resolution. Better Reliability.</p>
        </section>

        <section className="home-illustration" aria-label="Illustration placeholder">
          <div className="home-illustration-card">
            <p className="home-illustration-text">AI Support Illustration</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
