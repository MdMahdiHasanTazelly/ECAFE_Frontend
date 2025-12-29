import "./Register.css";

import React, { useState } from 'react';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
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
                    <h1 className="logo-text">E-CAFE</h1>
                </div>

                <div className="welcome-section">
                    <p className="welcome-subtitle">Please Register</p>
                </div>



                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            type="username"
                            placeholder="Username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

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

                        </label>
                    </div>

                    <button type="submit" className="login-button">
                        Register
                    </button>

                    <div className="login-footer">
                        <a href="#" className="footer-link">Forgot password?</a>
                        <span className="footer-text">
                            Already have an account? <a href="/login" className="footer-link">Login</a>
                        </span>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;