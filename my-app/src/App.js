import logo from './imgs/logo.png';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import './routes/Login.scss';
import SignUp from "./routes/signup";
import Index from "./routes";
import Albums from "./routes/Users/albums";
import Reviews from "./routes/Users/reviews";

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
            <div className = "body">
            <img className="logo" src={logo} alt="Logo" />

            <div className="wave-container">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
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
                    path="/index"
                    element={<Index  onSignIn={handleSignIn} />}
                />
                <Route
                    path = "/albums"
                    element = {<Albums onSignIn={handleSignIn} />}
                />
                <Route
                    path = "/reviews"
                    element = {<Reviews onSignIn={handleSignIn} />}
                />
            </Routes>
        </Router>
    );
}

export default App;