import React, { useState } from 'react';
import './App.scss';
import { useNavigate } from 'react-router-dom';
import './login.js';

function SignUp({ onSignIn }) {
    const [Fname, setFname] = useState('');
    const [Lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('User');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if(password.length < 8 || password.length > 16){
            alert('Password must be of length 8 to 16');
            return;
        }

        const accountData = {
            first_name: Fname,
            last_name: Lname,
            email: email,
            password: password,
            role: role
        };

        try {
            const response = await fetch('http://localhost:5000/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountData)
            });

            if (response.ok) {
                onSignIn({
                    fname: accountData.first_name,
                    lname: accountData.last_name,
                    email: accountData.email,
                    role: accountData.role
                });
                navigate('/chat');
            } else {
                const errorData = await response.json();
                alert('Error creating account: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error creating account:', error);
            alert('An error occurred while creating the account');
        }
    };

    const selectedStyle = {
        backgroundColor: '#124ba2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        marginRight: '10px',
        cursor: 'pointer'
    };

    const unselectedStyle = {
        backgroundColor: '#ccc',
        color: '#000',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 20px',
        marginRight: '10px',
        cursor: 'pointer'
    };

    return (
        <div className="sign-in-app">
            <div className="line-1 anim-typewriter">
                <p>Create a new account</p>
            </div>
            <div className="backdrop">
                <div className="sign-in-container">
                    <p className="sign-in-subtitle">Sign Up</p>
                    <p style={{ color: '#000', fontWeight: 'bold', marginBottom: '10px' }}>
                        Are you a User or an Artist?
                    </p>
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            type="button"
                            onClick={() => setRole('User')}
                            style={role === 'User' ? selectedStyle : unselectedStyle}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('Artist')}
                            style={role === 'Artist' ? selectedStyle : unselectedStyle}
                        >
                            Artist
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="sign-in-input"
                            value={Fname}
                            onChange={(e) => setFname(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                        <input
                            type="text"
                            className="sign-in-input"
                            value={Lname}
                            onChange={(e) => setLname(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                        <input
                            type="email"
                            className="sign-in-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            className="sign-in-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="password"
                            className="sign-in-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                        <button type="submit" className="sign-in-button">
                            Sign Up
                        </button>
                        <button
                            type="button"
                            className="sign-up-button"
                            onClick={() => navigate('/')}
                        >
                            Back to Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;