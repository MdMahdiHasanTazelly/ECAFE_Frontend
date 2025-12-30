import "./login.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import React, { useState } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        // console.log({ email, password }, process.env.REACT_APP_BACKEND_URL);

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);

                navigate("/menu");
            })
            .catch((error) => {
                console.log(error);
            })

        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-section">
                    <h1 className="logo-text">E-CAFE</h1>
                </div>

                <div className="welcome-section">
                    <h2 className="welcome-title">Welcome Back!</h2>
                    <p className="welcome-subtitle">Please login to your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>



                    <button type="submit" className="login-button">
                        Login
                    </button>

                    <div className="login-footer">
                        <a href="#" className="footer-link">Forgot password?</a>
                        <span className="footer-text">Don't have an account? <a href="/register" className="footer-link">Register</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;