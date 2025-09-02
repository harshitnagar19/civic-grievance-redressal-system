import React from 'react';
import SignUpForm from './SignUp';
import './SignUpForm.css';
const SignUpWrapper = () => {
  return (
    <div className="container">
      <div className="signup-container">
        <div className="signup-header">
          <h1><i className="fas fa-user-plus me-2"></i>Create Account</h1>
          <p>Join our community and unlock exclusive features</p>
        </div>
        
        <div className="signup-form">
          <SignUpForm />
        </div>
      </div>
      
      <div className="terms-text">
        By creating an account, you agree to our Terms of Service and acknowledge our Privacy Policy.
      </div>
    </div>
  );
};

export default SignUpWrapper;