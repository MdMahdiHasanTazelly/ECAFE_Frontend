import "./Register.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';

import { useNotification } from '../context/NotificationContext.js';


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { showSuccess, showError } = useNotification();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        // console.log({ email, password, username });

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { username, email, password })
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                navigate("/menu");
                showSuccess(res.data.message);
            })
            .catch((error) => {
                showError(error.response.data.message);
                console.log(error);
            })



        setEmail("");
        setPassword("");
        setUsername("");
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