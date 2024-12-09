import './artist.scss'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Users/LogOutBtn';

function Artist() {
    const navigate = useNavigate();
    const [artistName, setArtistName] = useState('Your Artist Name');

    return (
        <div className="artist-page-548">
            <header className="artist-header-548">
                <h1 className="artist-title-548">Welcome Back, {artistName}</h1>
                <p className="artist-subtitle-548">Manage your albums and connect with your audience.</p>
            </header>

            <div className="artist-nav-548">
                <button
                    className="artist-button-548"
                    onClick={() => navigate('/Aalbums')}
                >
                    Your Albums
                </button>
                <button
                    className="artist-button-548"
                    onClick={() => navigate('/artist-profile')}
                >
                    Your Profile
                </button>
            </div>

            <div className="artist-logout-548">
                <LogoutButton />
            </div>
        </div>
    );
}

export default Artist;