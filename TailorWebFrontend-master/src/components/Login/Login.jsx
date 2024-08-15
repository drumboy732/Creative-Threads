import React, { useState } from 'react';
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log(response)
        navigate(`/profile/${formData.username}`); // Redirect to profile page after successful login
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='' >
      <main>
        <div className="loginContainer">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="button-group">
              <div className="login-button">
                <button type="submit">Login</button>
              </div>
              <div className="register-button">
                <Link to="/register" style={{ paddingTop: '9.5px' }}>Register</Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
