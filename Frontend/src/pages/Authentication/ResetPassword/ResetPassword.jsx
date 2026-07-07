import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function validateStrongPassword(password) {
  if (!password) return 'New Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least 1 uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least 1 lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least 1 number';
  return '';
}

function validateConfirmPassword(confirmPassword, password) {
  if (!confirmPassword) return 'Confirm Password is required';
  if (confirmPassword !== password) return 'Passwords do not match';
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
    text-decoration: none;
    text-align: center;
    line-height: 44px;
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
    margin-bottom: 18px;
    padding: 12px 14px;
    border-radius: 8px;
    background-color: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
    font-size: 13px;
    line-height: 1.5;
    text-align: center;
  }

  .auth-success-actions {
    display: flex;
    flex-direction: column;
    gap: 18px;
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

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const errors = {
    password: validateStrongPassword(formData.password),
    confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
  };

  const isFormValid = !errors.password && !errors.confirmPassword;

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

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setSubmitError('');

    if (!resetToken) {
      setSubmitError('Invalid or missing password reset token.');
      return;
    }

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          newPassword: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to reset password.');
      }

      setResetComplete(true);
    } catch (error) {
      setSubmitError(error.message || 'Unable to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <style>{authStyles}</style>
      <div className="auth-card">
        <h1 className="auth-heading">Reset Password</h1>
        <p className="auth-subheading">Enter your new password below to complete the reset process.</p>

        {resetComplete ? (
          <div className="auth-success-actions">
            <div className="auth-success">&#10004; Password has been reset successfully.</div>
            <Link to="/login" className="auth-button">Return to Login</Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {!resetToken && (
              <p className="auth-error">Invalid or missing password reset token. Please use the link from your email.</p>
            )}
            <div className="auth-field">
              <label className="auth-label" htmlFor="reset-password">New Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="reset-password"
                  type={showPassword ? 'text' : 'password'}
                  className={getInputClassName('password')}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
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
              {shouldShowError('password') && <p className="auth-error">{errors.password}</p>}
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="reset-confirm-password">Confirm Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="reset-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  className={getInputClassName('confirmPassword')}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
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
              {shouldShowError('confirmPassword') && <p className="auth-error">{errors.confirmPassword}</p>}
            </div>

            {submitError && <p className="auth-error">{submitError}</p>}

            <button type="submit" className="auth-button" disabled={!isFormValid || !resetToken || isSubmitting}>
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {!resetComplete && (
          <div className="auth-footer">
            <Link to="/login" className="auth-link">Return to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
