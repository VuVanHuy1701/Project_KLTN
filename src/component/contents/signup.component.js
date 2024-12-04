import React, { useState } from 'react';
import './Css/signup.css'; 

const IndexSignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setPasswordVisible(!passwordVisible);
        } else if (field === 'confirmPassword') {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    };

    // States for image handling
    const [imageSrc, setImageSrc] = useState('https://placehold.co/400x600');
    const [altText, setAltText] = useState('Default image for signup');

    // Function to change image based on input focus
    const changeImage = (field) => {
        if (field === 'firstName') {
            setImageSrc('https://placehold.co/400x600?text=First+Name');
            setAltText('Image for first name');
        } else if (field === 'lastName') {
            setImageSrc('https://placehold.co/400x600?text=Last+Name');
            setAltText('Image for last name');
        } else if (field === 'email') {
            setImageSrc('https://placehold.co/400x600?text=Email');
            setAltText('Image for email');
        } else if (field === 'phone') {
            setImageSrc('https://placehold.co/400x600?text=Phone+Number');
            setAltText('Image for phone number');
        } else if (field === 'password') {
            setImageSrc('https://placehold.co/400x600?text=Password');
            setAltText('Image for password');
        } else if (field === 'confirmPassword') {
            setImageSrc('https://placehold.co/400x600?text=Confirm+Password');
            setAltText('Image for confirm password');
        }
    };

    return (
        <div className="container">
            <div className="left-section">
                <img
                    src={imageSrc}
                    alt={altText}
                    height="600"
                    width="500"
                />
            </div>
            <div className="form-section">
                <div className="logo">
                    <img
                        src="https://storage.googleapis.com/a1aa/image/hmzcZP9odsIULFm8g3yfqfoio5gubKBj3KtevX0kApQjfPlOB.jpg"
                        alt="Your Logo"
                        width="40"
                        height="40"
                    />
                    <span>Logo</span>
                </div>
                <h2>Sign up</h2>
                <p>Let's get you all set up so you can access your personal account.</p>
                <form>
                    <div className="form-group half-width ip-left">
                        <input
                            id="first-name"
                            placeholder=" "
                            type="text"
                            onFocus={() => changeImage('firstName')}
                        />
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="form-group half-width">
                        <input
                            id="last-name"
                            placeholder=" "
                            type="text"
                            onFocus={() => changeImage('lastName')}
                        />
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="form-group half-width ip-left">
                        <input
                            id="email"
                            placeholder=" "
                            type="email"
                            onFocus={() => changeImage('email')}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-group half-width">
                        <input
                            id="phone"
                            placeholder=" "
                            type="text"
                            onFocus={() => changeImage('phone')}
                        />
                        <label htmlFor="phone">Phone Number</label>
                    </div>
                    <div className="form-group password-toggle">
                        <input
                            id="password"
                            placeholder=" "
                            type={passwordVisible ? 'text' : 'password'}
                            onFocus={() => changeImage('password')}
                        />
                        <label htmlFor="password">Password</label>
                        <i
                            className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} toggle-icon`}
                            onClick={() => togglePasswordVisibility('password')}
                        ></i>
                    </div>
                    <div className="form-group password-toggle">
                        <input
                            id="confirm-password"
                            placeholder=" "
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            onFocus={() => changeImage('confirmPassword')}
                        />
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <i
                            className={`fas ${confirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} toggle-icon`}
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                        ></i>
                    </div>
                    <div className="form-group terms">
                        <input className="terms-input" type="checkbox" />
                        <label htmlFor="terms">
                            I agree to all the{' '}
                            <a className='terms-a' href="#">Terms and Privacy Policies</a>
                        </label>
                    </div>
                    <div className="form-group">
                        <button className="submit-btn" type="submit">
                            Create account
                        </button>
                    </div>
                    <div className="form-group login-link">
                        <p>
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                    <div class="signup-container">
                        <div class="divider">Login with</div>
                    </div>
                    <div className="social-signup">
                        <button class="btn-lgw">
                            <a href="#" class='button btn-fb'>
                                <svg>
                                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                                </svg>
                                <i className="fab fa-facebook-f"></i> Facebook
                            </a>            
                        </button>
                        <button class="btn-lgw">
                            <a href="#" class='button btn-gg'>
                                <svg>
                                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                                </svg>
                                <i className="fab fa-google"></i> Google
                            </a>            
                        </button>
                        <button class="btn-lgw">
                            <a href="#" class='button btn-ap'>
                                <svg>
                                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                                </svg>
                                <i className="fab fa-apple"></i> Apple
                            </a>            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IndexSignUp;
