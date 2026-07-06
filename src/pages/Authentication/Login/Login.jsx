import { useState } from 'react';
import { Link } from 'react-router-dom';

const authStyles = `
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 24px 16px;
    background-color: #f0f2f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
  }

  .auth-page *,
  .auth-page *::before,
  .auth-page *::after {
    box-sizing: border-box;
  }

  .auth-card {
    width: 100%;
    max-width: 420px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    padding: 40px 36px;
  }

  .auth-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    margin: 0 auto 24px;
    background-color: #e8edf5;
    border-radius: 10px;
    color: #1a56db;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  .auth-heading {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    text-align: center;
    line-height: 1.3;
  }

  .auth-subheading {
    margin: 0 0 28px;
    font-size: 14px;
    color: #6b7280;
    text-align: center;
    line-height: 1.5;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .auth-label {
    font-size: 13px;
    font-weight: 500;
    color: #374151;
  }

  .auth-input {
    width: 100%;
    height: 42px;
    padding: 0 14px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #111827;
    background-color: #ffffff;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .auth-input:focus {
    border-color: #1a56db;
    box-shadow: 0 0 0 3px rgba(26, 86, 219, 0.1);
  }

  .auth-input::placeholder {
    color: #9ca3af;
  }

  .auth-password-wrapper {
    position: relative;
  }

  .auth-password-wrapper .auth-input {
    padding-right: 44px;
  }

  .auth-toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: #6b7280;
    cursor: pointer;
  }

  .auth-toggle-password:hover {
    color: #374151;
    background-color: #f3f4f6;
  }

  .auth-checkbox-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .auth-checkbox-row input[type='checkbox'] {
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: #1a56db;
    cursor: pointer;
  }

  .auth-checkbox-label {
    font-size: 13px;
    color: #4b5563;
    cursor: pointer;
    user-select: none;
  }

  .auth-button {
    width: 100%;
    height: 44px;
    margin-top: 4px;
    border: none;
    border-radius: 8px;
    background-color: #1a56db;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .auth-button:hover {
    background-color: #1648c0;
  }

  .auth-footer {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .auth-link {
    font-size: 13px;
    color: #1a56db;
    text-decoration: none;
    font-weight: 500;
  }

  .auth-link:hover {
    text-decoration: underline;
  }

  .auth-footer-text {
    font-size: 13px;
    color: #6b7280;
  }

  @media (max-width: 480px) {
    .auth-card {
      padding: 32px 24px;
    }

    .auth-heading {
      font-size: 22px;
    }
  }
`;

function EyeIcon({ visible }) {
  if (visible) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <style>{authStyles}</style>
      <div className="auth-card">
        <div className="auth-logo">LOGO</div>
        <h1 className="auth-heading">Welcome Back</h1>
        <p className="auth-subheading">Sign in to your account to continue</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">Password</label>
            <div className="auth-password-wrapper">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>

          <div className="auth-checkbox-row">
            <input id="remember-me" type="checkbox" />
            <label className="auth-checkbox-label" htmlFor="remember-me">Remember Me</label>
          </div>

          <button type="submit" className="auth-button">Login</button>
        </form>

        <div className="auth-footer">
          <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
          <p className="auth-footer-text">
            Don&apos;t have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
