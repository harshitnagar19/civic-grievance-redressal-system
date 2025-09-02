import React, { useState } from 'react';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2) newErrors.firstName = 'First name must be at least 2 characters';
    
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    else if (formData.lastName.trim().length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      alert('Account created successfully!');
      console.log('Form data:', formData);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
    } else {
      setErrors(newErrors);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };
  
  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
            <input 
              type="text" 
              className={`form-control with-icon ${errors.firstName ? 'is-invalid' : ''}`}
              id="firstName" 
              name="firstName"
              placeholder="Enter your first name" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
            <input 
              type="text" 
              className={`form-control with-icon ${errors.lastName ? 'is-invalid' : ''}`}
              id="lastName" 
              name="lastName"
              placeholder="Enter your last name" 
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email Address</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fas fa-envelope"></i></span>
          <input 
            type="email" 
            className={`form-control with-icon ${errors.email ? 'is-invalid' : ''}`}
            id="email" 
            name="email"
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fas fa-lock"></i></span>
          <input 
            type={showPassword ? "text" : "password"}
            className={`form-control with-icon ${errors.password ? 'is-invalid' : ''}`}
            id="password" 
            name="password"
            placeholder="Create a strong password" 
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={togglePasswordVisibility}
          >
            <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {errors.password && <div className="error-message">{errors.password}</div>}
        <div className="password-rules">
          <small>Use at least 8 characters with a mix of uppercase, lowercase letters and numbers</small>
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <div className="input-group">
          <span className="input-group-text"><i className="fas fa-lock"></i></span>
          <input 
            type={showConfirmPassword ? "text" : "password"}
            className={`form-control with-icon ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword" 
            name="confirmPassword"
            placeholder="Confirm your password" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={toggleConfirmPasswordVisibility}
          >
            <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
      </div>
      
      <div className="mb-3 form-check">
        <input 
          type="checkbox" 
          className={`form-check-input ${errors.agreeToTerms ? 'is-invalid' : ''}`}
          id="terms" 
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          required
        />
        <label className="form-check-label" htmlFor="terms">
          I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </label>
        {errors.agreeToTerms && <div className="error-message">{errors.agreeToTerms}</div>}
      </div>
      
      <button type="submit" className="btn btn-signup w-100 text-white">
        <i className="fas fa-user-plus me-2"></i>Create Account
      </button>
      
      <div className="divider">
        <span>Or sign up with</span>
      </div>
      
      <div className="social-login">
        <button type="button" className="btn social-btn btn-google">
          <i className="fab fa-google me-2"></i>Google
        </button>
        <button type="button" className="btn social-btn btn-facebook">
          <i className="fab fa-facebook-f me-2"></i>Facebook
        </button>
      </div>
      
      <div className="login-link">
        Already have an account? <a href="#">Log In</a>
      </div>
    </form>
  );
};

export default SignUpForm;