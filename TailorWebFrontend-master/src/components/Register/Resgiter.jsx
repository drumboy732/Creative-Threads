import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import "./register.css";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phone: ''
    });

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
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log(response)
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                // Handle registration error
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <main>
                <div className="registerContainer">
                    <form className="login-form" onSubmit={handleSubmit} >
                        <div htmlFor="username" className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div htmlFor="name" className="form-group">
                            <label for="name">Name:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Phone:</label>
                            <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="button-group">
                            <div className="register-button">
                                <button type='submit' style={{ paddingTop: '9.5px' }} >Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>


    );
};

export default Register;
