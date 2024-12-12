import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import './signup.js';

function Login({ onSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('User'); // State for role selection

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Login role:', role);

        if (role === 'User') {
            navigate('/index'); // Redirect to user index
        } else if (role === 'Artist') {
            navigate('/artist-index'); // Redirect to artist index
        }
    };

    return (
        <div className="sign-in-app">
            <div className="line-1 anim-typewriter">
                <p>Welcome to Music Box</p>
            </div>
            <div className="backdrop">
                <div className="sign-in-container">
                    <h2 className="sign-in-title">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="sign-in-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="sign-in-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="sign-up-button"
                            onClick={() => navigate('./signup')}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;