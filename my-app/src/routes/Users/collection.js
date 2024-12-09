import "./users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../../imgs/logo.png";
import LogoutButton from './LogOutBtn'




function Collection  () {

    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/albums')
            .then(response => {
                setAlbums(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
                setError('Failed to load albums. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="index-745">
                <header className="index-header-745">
                    <h1 className="line-1-745 anim-typewriter-745">My Collections</h1>
                    <p className="sentence-745">Loading albums, please wait...</p>
                </header>
            </div>
        );
    }

    if (error) {
        return (
            <div className="index-745">
                <LogoutButton/>
                <header className="index-header-745">
                    <h1 className="">My Collections</h1>
                    <p className="sentence-745">{error}</p>
                </header>
                <button
                    style={{
                        padding: '10px 20px',
                        margin: '20px 0',
                        borderRadius: '8px',
                        backgroundColor: '#124ba2',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        position: 'center'
                    }}
                    onClick={() => navigate('/index')}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="index-745">
            <header className="index-header-745">
                <h1 className="">Albums</h1>
                <p className="sentence-745">Track favorites, review albums, and connect with other music lovers.</p>
                <img src={logo} alt="Logo" style={{ display: 'none' }} />
            </header>
            <div className="album-list-745" style={{ padding: '20px' }}>
                <h2>Album List</h2>
                {albums.length === 0 ? (
                    <h1
                        style ={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px' }}
                    >No albums found.</h1>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {albums.map(album => (
                            <li key={album.id} style={{ marginBottom: '10px' }}>
                                <strong>{album.title}</strong> by {album.artist}
                                <br />
                                Genre: {album.genre}, Released: {album.release_date}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                style={{
                    padding: '10px 20px',
                    margin: '20px 0',
                    borderRadius: '8px',
                    backgroundColor: '#124ba2',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
            >
                Go Back
            </button>
        </div>
    );
}

export default Collection;