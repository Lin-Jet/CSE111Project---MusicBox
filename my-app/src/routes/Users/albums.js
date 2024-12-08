import "../App.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios

function Albums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch albums from the backend
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
            <div className="index">
                <header className="index-header">
                    <h1 className="line-1 anim-typewriter">Albums</h1>
                    <p className="sentence">Loading albums, please wait...</p>
                </header>
            </div>
        );
    }

    if (error) {
        return (
            <div className="index">
                <header className="index-header">
                    <h1 className="line-1 anim-typewriter">Albums</h1>
                    <p className="sentence">{error}</p>
                </header>
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

    return (
        <div className="index">
            <header className="index-header">
                <h1 className="line-1 anim-typewriter">Albums</h1>
                <p className="sentence">Track favorites, review albums, and connect with other music lovers.</p>
            </header>
            <div className="album-list" style={{ padding: '20px' }}>
                <h2>Album List</h2>
                {albums.length === 0 ? (
                    <p>No albums found.</p>
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

export default Albums;