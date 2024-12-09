import './App.scss';
import logo from '../imgs/logo.png';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import './App.scss';
import SignUp from "./signup";
import Index from "./index";
import Albums from "./Users/albums";
import Collections from "./Users/collection";
import Reviews from "./Users/reviews";
import Artist from "./Artist/ArtistIndex";
import Artist_albums from "./Artist/Artist_albums";
{/*import Profile from "./Artist/artist_profile";*/}

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleSignIn = (account) => {
        if (!account || !account.email) {
            console.log('Invalid account object:', account);
            return;
        }
        console.log('handleSignIn called with:', account);
        setIsSignedIn(true);
        localStorage.setItem('email', account.email);
        localStorage.setItem('fname', account.fname);
        localStorage.setItem('lname', account.lname);
    };

    return (
        <Router>
            <img className="logo" src={logo} alt="Logo" />

            <div className="wave-container">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>

            <Routes>
                <Route
                    path="/"
                    element={<Login onSignIn={handleSignIn} />}
                />
                <Route
                    path = "/signup"
                    element = {<SignUp onSignIn={handleSignIn} />}
                />
                <Route
                    path = "/index"
                    element={<Index onSignIn={handleSignIn} />}
                    />
                <Route
                    path = "/albums"
                    element = {<Albums onSignIn={handleSignIn} />}
                />

                <Route
                    path = "/collection"
                    element = {<Collections onSignIn={handleSignIn} />}
                    />

                <Route
                    path = "/reviews"
                    element = {<Reviews onSignIn={handleSignIn} />}
                    />

                <Route
                    path = '/artist'
                    element = { <Artist onSignIn={handleSignIn} />}
                />

                <Route
                    path = "Aalbums"
                    element = { <Artist_albums onSignIn={handleSignIn} />}
                    />

                {/* <Route
                    path = 'profile'
                    element = { <Profile onSignIn={handleSignIn} />}
                    />
                */}

            </Routes>
        </Router>
    );
}

export default App;