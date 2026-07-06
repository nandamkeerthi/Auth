import { useState } from 'react';
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

function validateEmail(email) {
  if (!email.trim()) return 'Email is required';
  if (!isValidEmail(email)) return 'Please enter a valid email address.';
  return '';
}

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

  .auth-input-invalid {
    border-color: #dc2626;
  }

  .auth-input-invalid:focus {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  .auth-input-valid {
    border-color: #16a34a;
  }

  .auth-input-valid:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
  }

  .auth-error {
    margin: 0;
    font-size: 12px;
    color: #dc2626;
    line-height: 1.4;
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

  .auth-button:disabled {
    background-color: #93b4f0;
    cursor: not-allowed;
  }

  .auth-button:disabled:hover {
    background-color: #93b4f0;
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

  .auth-success {
    margin-bottom: 12px;
    padding: 12px 14px;
    border-radius: 8px;
    background-color: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
  }

  .auth-info-note {
    margin: 0 0 18px;
    padding: 12px 14px;
    border-radius: 8px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #6b7280;
    font-size: 12px;
    line-height: 1.6;
    text-align: center;
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

function ForgotPassword() {
  const [formData, setFormData] = useState({ email: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const errors = {
    email: validateEmail(formData.email),
  };

  const isFormValid = !errors.email;

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function getInputClassName(field) {
    const classes = ['auth-input'];
    const showValidation = touched[field] || submitted;

    if (showValidation) {
      if (errors[field]) {
        classes.push('auth-input-invalid');
      } else if (formData[field]) {
        classes.push('auth-input-valid');
      }
    }

    return classes.join(' ');
  }

  function shouldShowError(field) {
    return (touched[field] || submitted) && errors[field];
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      return;
    }

    // TODO: Call POST /forgot-password API
  //
  // Backend will:
  // 1. Verify email
  // 2. Generate secure reset token
  // 3. Store token in database
  // 4. Send password reset email
  //
  // Expected request body:
  // { email: formData.email }
  //
  // The .NET backend will verify the email exists, generate a secure token,
  // store it in the database, and send a real email containing a link such as:
  // https://your-domain.com/reset-password?token=<secure-token>

    setRequestSent(true);
  }

  return (
    <div className="auth-page">
      <style>{authStyles}</style>
      <div className="auth-card">
        <h1 className="auth-heading">Forgot Password</h1>
        <p className="auth-subheading">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {requestSent ? (
          <>
            <div className="auth-success">
              If an account exists with this email address, a password reset link will be sent.
            </div>
            <p className="auth-info-note">
              Currently this project is running in frontend-only mode.
              A real password reset email will be sent after the backend is integrated.
            </p>
          </>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="forgot-email">Email Address</label>
              <input
                id="forgot-email"
                type="email"
                className={getInputClassName('email')}
                placeholder="Enter your email address"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {shouldShowError('email') && <p className="auth-error">{errors.email}</p>}
            </div>

            <button type="submit" className="auth-button" disabled={!isFormValid}>Send Reset Link</button>
          </form>
        )}

        <div className="auth-footer">
          <Link to="/login" className="auth-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
