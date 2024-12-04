// IndexLogin.js
import React, { useState } from 'react';
import LoginForm from './LoginForm/loginForm.js';
import ForgotPasswordForm from './LoginForm/forgotpasswordForm.js';
import ChangePasswordForm from './LoginForm/changepasswordForm.js';
import './Css/login.css';


const IndexLogin = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [imageSrc, setImageSrc] = useState('https://storage.googleapis.com/a1aa/image/fxmnxvNeVilmepCLGX86ezBg6li15P8KIGuQfkfkkjjnmeL0JA.jpg');
  const [altText, setAltText] = useState('Hand holding a smartphone with a security lock and checkmark');

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

  return (
    <div className="container">
      <div className="left">
        {isForgotPassword ? (
          <ForgotPasswordForm
            onBackToLoginClick={() => setIsForgotPassword(false)}
            onClick={() => setIsChangePass(true)}
            onChangeImage={changeImage}
          />
        ) : isChangePass ? (
          <ChangePasswordForm
            onSubmitClick={() => setIsChangePass(false)}
            onChangeImage={changeImage}
          />
        ) : (
          <LoginForm
            onForgotPasswordClick={() => setIsForgotPassword(true)}
            onChangeImage={changeImage}
          />
        )}
      </div>
      <div className="right">
        <img 
          src={imageSrc} 
          alt={altText}
          height="600"
          width="500" />
      </div>
    </div>
  );
};

export default IndexLogin;
