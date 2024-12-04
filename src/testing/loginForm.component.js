import React, { useState } from 'react';
import './Css/login.css'; 

const IndexLogin = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [imageSrc, setImageSrc] = useState('https://storage.googleapis.com/a1aa/image/fxmnxvNeVilmepCLGX86ezBg6li15P8KIGuQfkfkkjjnmeL0JA.jpg');
  const [altText, setAltText] = useState('Hand holding a smartphone with a security lock and checkmark');

  // States for Login form
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // States for Forgot Password form
  const [forgotEmailFocused, setForgotEmailFocused] = useState(false);
  const [forgotEmailValue, setForgotEmailValue] = useState('');

 // States for Forgot Password form
  const [newforgotFocused, setNewforgotFocused] = useState(false);
  const [newforgotValue, setNewforgotValue] = useState('');

  const [checkforgotFocused, setCheckforgotFocused] = useState(false);
  const [checkforgotValue, setCheckforgotValue] = useState('');

  //check pass when error 
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordSpaceError, setPasswordSpaceError] = useState(false);
  const [passwordSpecialCharError, setPasswordSpecialCharError] = useState(false);

  //đổi hình ảnh qua các thanh input
  const changeImage = (action) => {
    if (action === 'email') {
      setImageSrc('https://placehold.co/300x500?text=Image+1');
      setAltText('Image 1 description');
    } else if (action === 'password') {
      setImageSrc('https://placehold.co/300x500?text=Image+2');
      setAltText('Image 2 description');
    } else if (action === 'forgot') {
      setImageSrc('https://placehold.co/300x500?text=Image+3');
      setAltText('Image 3 description');
    }
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleLoginClick = () => {
    setIsForgotPassword(false);
    setIsVerifyingCode(true);
  };

  const handleBackToLoginClick = () => {
    setIsForgotPassword(false);
    setIsVerifyingCode(false);
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setIsVerifyingCode(true);
  };

  //-----------check ký tự và check mật khẩu mới---------------//
  // State for new password validation
  const [newPasswordError, setNewPasswordError] = useState('');
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
  };

  const forgotPasswordForm = (
    <div className="fotgotpass">
      <div className="back-to-login" onClick={handleBackToLoginClick} onFocus={() => changeImage('email')}>
        <i className="fas fa-arrow-left"></i> Back to login
      </div>
      <h2>Forgot your password?</h2>
      <p>Don't worry, it happens to all of us. Enter your email below to recover your password</p>
      <form onSubmit={handleForgotPasswordSubmit}>
        <div className={input-container ${forgotEmailFocused || forgotEmailValue ? 'focused' : ''}}>
          <label htmlFor="forgot-email">Email</label>
          <input
            id="forgot-email"
            type="email"
            value={forgotEmailValue}
            onFocus={() => { setForgotEmailFocused(true); changeImage('email'); }}
            onBlur={() => setForgotEmailFocused(false)}
            onChange={(e) => setForgotEmailValue(e.target.value)}
          />
        </div>
        <button className="login-btn" type="submit" onClick={handleLoginClick}>A
          Submit
        </button>
      </form>
      <div class="login-container">
        <div class="divider">Login with</div>
      </div>
      <div className="social-login">
        <button class="btn-lgw">
              <a href="#" class='button btn-fb'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-facebook-f"></i> Facebook
              </a>            
        </button>

        <button class="btn-lgw">
              <a href="#" class='button btn-gg'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-google "></i> 
                  <span className='g'>G</span>
                  <span className='o1'>o</span>
                  <span className='o2'>o</span>
                  <span className='g'>g</span>
                  <span className='l'>l</span>
                  <span className='e'>e</span>
              </a>            
        </button>

        <button class="btn-lgw">
              <a href="#" class='button btn-ap'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-apple"></i> Apple
              </a>            
        </button>
      </div>
    </div>
  );

  const verifyCodeForm = (
    <div className="verify">
      <div className="back-to-login" onClick={handleBackToLoginClick} onFocus={() => changeImage('email')}>
        <i className="fas fa-arrow-left"></i> Back to login
      </div>
      <h2>Verify code</h2>
      <p>An authentication code has been sent to your email.</p>
      <form>
        <div className={input-container ${newforgotFocused || newforgotValue ? 'focused' : ''}}>
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={newforgotValue}
            onFocus={() => { setNewforgotFocused(true); changeImage('email'); }}
            onBlur={() => setNewforgotFocused(false)}
            onChange={handleNewPasswordChange}
          />
          {/* Display password validation messages */}
          <div className="err-mesg">
            <span className={passwordLengthError ? 'error-message' : 'success-message'}>
              {passwordLengthError ? 'Password must be more than 6 characters long' : 'Password length is valid'} 
            </span>
            <br></br>
            <span className={passwordSpaceError ? 'error-message' : 'success-message'}>
              {passwordSpaceError ? 'Password must not contain spaces' : 'No spaces in the password'}
            </span>
            <br></br>
            <span className={passwordSpecialCharError ? 'error-message' : 'success-message'}>
              {passwordSpecialCharError ? 'Password must contain at least one special character' : 'Contains special character'}
            </span>
          </div>
        </div>
        <div className={input-container ${checkforgotFocused || checkforgotValue ? 'focused' : ''}}>
          <label htmlFor="check-password">Check password</label>
          <input
            id="check-password"
            type="password"
            value={checkforgotValue}
            onFocus={() => { setCheckforgotFocused(true); changeImage('email'); }}
            onBlur={() => setCheckforgotFocused(false)}
            onChange={(e) => setCheckforgotValue(e.target.value)}
          />
        </div>
        <p>Didn't receive a code? <span className="resend-code">Resend</span></p>
        <button className="login-btn" type="submit" disabled={passwordLengthError || passwordSpaceError || passwordSpecialCharError}>
          Verify
        </button>
      </form>
    </div>
  );


  const loginForm = (
    <div>
      <div className="logo-login">
        <i className="fas fa-brain"></i>
        <span>20/10</span>
      </div>
      <h2>Login</h2>
      <p>Login to access your travelwise account</p>
      <form>
        <div className={input-container ${emailFocused || emailValue ? 'focused' : ''}}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={emailValue}
            onFocus={() => { setEmailFocused(true); changeImage('email'); }}
            onBlur={() => setEmailFocused(false)}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className={input-container ${passwordFocused || passwordValue ? 'focused' : ''}}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={passwordValue}
            onFocus={() => { setPasswordFocused(true); changeImage('password'); }}
            onBlur={() => setPasswordFocused(false)}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          
        </div>
        <div className="remember-me">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a
          className="forgot-password"
          onFocus={() => changeImage('forgot')}
          href="#"
          onClick={handleForgotPasswordClick}
        >
          Forgot Password?
        </a>
        <button className="login-btn" type="button">
          Login
        </button>
      </form>
      <div className="signup">
        Don't have an account? <a href="/signup">Sign up</a>
      </div>
      <div class="login-container">
        <div class="divider">Login with</div>
      </div>
      <div className="social-login">
        <button class="btn-lgw">
              <a href="#" class='button btn-fb'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-facebook-f"></i> Facebook
              </a>            
        </button>

        <button class="btn-lgw">
              <a href="#" class='button btn-gg'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-google "></i> 
                  <span className='g'>G</span>
                  <span className='o1'>o</span>
                  <span className='o2'>o</span>
                  <span className='g'>g</span>
                  <span className='l'>l</span>
                  <span className='e'>e</span>
              </a>            
        </button>

        <button class="btn-lgw">
              <a href="#" class='button btn-ap'>
                  <svg>
                      <rect
                          x="0" y="0" 
                          fill="none"
                          width="100%"
                          height="100%"
                      />
                  </svg>
                  <i className="fab fa-apple"></i> Apple
              </a>            
        </button>
      </div>
      
    </div>
  );

  return (
    <div className="container">
      <div className="left">
        {isForgotPassword ? forgotPasswordForm : isVerifyingCode ? verifyCodeForm : loginForm}
      </div>
      <div className="right">
        <img
          src={imageSrc}
          alt={altText}
          height="600"
          width="500"
        />
      </div>
    </div>
  );
};

export default IndexLogin; 