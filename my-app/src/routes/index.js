import "./App.scss";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Index({ onSignIn }) {
    const navigate = useNavigate();

    return (
        <div className="index">
            <header className="index-header">
                <h1>Welcome to MusicBox</h1>
                <p>Track favorites, review albums, and connect with other music lovers.</p>
            </header>
            <div className="index-nav">
                <button onClick={() => navigate('/albums')}>View Albums</button>
                <button onClick={() => navigate('/reviews')}>Your Reviews</button>
                <button onClick={() => navigate('/collection')}>Your Collection</button>
            </div>
        </div>
    );
}

export default Index;