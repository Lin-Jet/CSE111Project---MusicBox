import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./users.scss";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
        navigate('/');
    };

    return (
        <button className = "button-123" onClick={handleLogout}
        >
            Log Out
        </button>
    );
}

export default LogoutButton;