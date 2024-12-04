// ForgotPasswordForm.js
import React, { useState } from "react";

const ForgotPasswordForm = ({ onBackToLoginClick, onClick, onChangeImage }) => {
  
  // States for Forgot Password form
  const [forgotEmailFocused, setForgotEmailFocused] = useState(false);
  const [forgotEmailValue, setForgotEmailValue] = useState("");

  return (
    <div className="fotgotpass">
      <div
        className="back-to-login"
        onClick={onBackToLoginClick}
        onFocus={() => onChangeImage("email")}
      >
        <i className="fas fa-arrow-left"></i> Back to login
      </div>
      <h2>Forgot your password?</h2>
      <p>Enter your email below to recover your password</p>
      <form>
        <div
          className={`input-container ${
            forgotEmailFocused || forgotEmailValue ? "focused" : ""
          }`}
        >
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            type="email"
            value={forgotEmailValue}
            onFocus={() => {
              setForgotEmailFocused(true);
              onChangeImage("email");
            }}
            onBlur={() => setForgotEmailFocused(false)}
            onChange={(e) => setForgotEmailValue(e.target.value)}
          />
        </div>
        <div onClick={onBackToLoginClick}>
          <button className="login-btn" type="submit" onClick={onClick}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
