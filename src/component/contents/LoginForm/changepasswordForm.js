// ChangePasswordForm.js
import React, { useState } from "react";

const ChangePasswordForm = ({
  onBackToLoginClick,
  onSubmitClick,
  onChangeImage,
}) => {
  const [newforgotFocused, setNewforgotFocused] = useState(false);
  const [newforgotValue, setNewforgotValue] = useState("");

  const [checkforgotFocused, setCheckforgotFocused] = useState(false);
  const [checkforgotValue, setCheckforgotValue] = useState("");
 
  //check pass when error 
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordSpaceError, setPasswordSpaceError] = useState(false);
  const [passwordSpecialCharError, setPasswordSpecialCharError] =
    useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  //-----------check ký tự và check mật khẩu mới---------------//
  // Function to validate password
  const validatePassword = (password) => {
    // Check for minimum length
    setPasswordLengthError(password.length < 6);
    // Check for spaces
    setPasswordSpaceError(/\s/.test(password));
    // Check for special characters
    setPasswordSpecialCharError(!/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewforgotValue(value);
    // Validate the password and set the error messages
    validatePassword(value);
    checkPasswordsMatch(value, checkforgotValue);
  };

  const handleCheckPasswordChange = (e) => {
    const value = e.target.value;
    setCheckforgotValue(value);
    checkPasswordsMatch(newforgotValue, value);
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordMatchError(password !== confirmPassword);
  };

  return (
    <div className="verify">
      <div
        className="back-to-login"
        onClick={onSubmitClick}
        onFocus={() => onChangeImage("email")}
      >
        <i className="fas fa-arrow-left"></i> Back to login
      </div>
      <h2>Verify code</h2>
      <p>An authentication code has been sent to your email.</p>
      <form>
        <div
          className={`input-container iChange ${
            newforgotFocused || newforgotValue ? "focused" : ""
          }`}
        >
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={newforgotValue}
            onFocus={() => {
              setNewforgotFocused(true);
              onChangeImage("email");
            }}
            onBlur={() => setNewforgotFocused(false)}
            onChange={handleNewPasswordChange}
          />
          <div className="err-mesg">
            <span
              className={
                passwordLengthError ? "error-message" : "success-message"
              }
            >
              {passwordLengthError ? (
                <>{"\u2717"} Password must be more than 6 characters long</>
              ) : (
                <>{"\u2713"} Password length is valid</>
              )}
              <br />
            </span>
            <span
              className={
                passwordSpaceError ? "error-message" : "success-message"
              }
            >
              {passwordSpaceError ? (
                <>{"\u2717"} Password must not contain spaces</>
              ) : (
                <>{"\u2713"} No spaces in the password</>
              )}
              <br />
            </span>
            <span
              className={
                passwordSpecialCharError ? "error-message" : "success-message"
              }
            >
              {passwordSpecialCharError ? (
                <>
                  {"\u2717"} Password must contain at least one special
                  character
                </>
              ) : (
                <>{"\u2713"} Contains special character</>
              )}
            </span>
          </div>
        </div>

        <div
          className={`input-container iChangeCheck ${
            checkforgotFocused || checkforgotValue ? "focused" : ""
          } ${passwordMatchError ? "error-border" : "success-border"}`}
        >
          <label htmlFor="check-password">Confirm password</label>
          <input
            id="check-password"
            type="password"
            value={checkforgotValue}
            onFocus={() => {
              setCheckforgotFocused(true);
              onChangeImage("email");
            }}
            onBlur={() => setCheckforgotFocused(false)}
            onChange={handleCheckPasswordChange}
          />
          {passwordMatchError && (
            <span className="error-message err-mesg">
              {"\u2717"} Passwords do not match
            </span>
          )}
        </div>

        <p>
          Didn't receive a code?
          <a className="resend-code" href="/login">
            Resend
          </a>
        </p>
        <button
          className="login-btn"
          type="submit"
          onClick={onSubmitClick}
          disabled={
            passwordLengthError ||
            passwordSpaceError ||
            passwordSpecialCharError ||
            passwordMatchError
          }
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
