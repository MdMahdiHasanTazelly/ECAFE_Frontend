import "./login.css";

import React, { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ email, password, rememberMe });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo-section">
                    <h1 className="logo-text">BAIUST E-CAFE</h1>
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

                    <div className="form-options">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="checkbox-input"
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-text">Remember me</span>
                        </label>
                    </div>

                    <button type="submit" className="login-button">
                        Login
                    </button>

                    <div className="login-footer">
                        <a href="#" className="footer-link">Forgot password?</a>
                        <span className="footer-text">Don't have an account? <a href="#" className="footer-link">Sign up</a></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;