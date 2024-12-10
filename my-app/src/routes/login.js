import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login } from './apiService';
import './App.scss';

function Login({ onSignIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('User'); // Default to "User"
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login({ email, password });

            // Store the user data in localStorage
            localStorage.setItem('user', JSON.stringify(response));

            // Redirect based on selected role
            if (role === 'User') {
                navigate('/index');
            } else if (role === 'Artist') {
                navigate('/artist');
            } else {
                setError('Invalid role selected. Please try again.');
            }
        } catch (error) {
            alert('Invalid email or password. Please try again.');
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
                            type="email"
                            className="sign-in-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <div className="password-wrapper" style={{ position: 'relative' }}>
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
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: '#888',
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <select
                            className="sign-in-input"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                                marginTop: '10px',
                                marginBottom: '10px',
                                padding: '10px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                width: '100%',
                            }}
                        >
                            <option value="User">User</option>
                            <option value="Artist">Artist</option>
                        </select>
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                        <button
                            type="button"
                            className="sign-in-button"
                            style={{
                                marginTop: '10px',
                            }}
                            onClick={() => navigate('/signup')}
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