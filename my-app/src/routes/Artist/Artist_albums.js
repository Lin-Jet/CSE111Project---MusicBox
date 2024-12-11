import './artist.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Users/LogOutBtn';

function ArtistAlbums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAlbum, setNewAlbum] = useState({ title: '', genre: '', releaseDate: '', artist_name: '' });

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://127.0.0.1:5000/api/albums');
            if (!response.ok) throw new Error('Failed to fetch albums');
            const data = await response.json();
            setAlbums(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching albums:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddAlbum = async () => {
        const { title, genre, releaseDate, artist_name } = newAlbum;
        if (!title || !genre || !releaseDate || !artist_name) {
            alert('Fill all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAlbum),
            });
            if (!response.ok) throw new Error('Failed to add album');
            const addedAlbum = await response.json();
            setAlbums([...albums, addedAlbum]);
            setNewAlbum({ title: '', genre: '', releaseDate: '', artist_name: '' });
        } catch (error) {
            setError(error.message);
            console.error('Error adding album:', error);
        }
    };

    const handleDeleteAlbum = async (albumId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/albums/${albumId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete album');
            setAlbums(albums.filter(album => album.id !== albumId));
        } catch (error) {
            setError(error.message);
            console.error('Error deleting album:', error);
        }
    };

    if (isLoading) return <div className="loading-spinner">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="artist-albums-container">
            <header className="artist-albums-header">
                <h1>Your Albums</h1>
                <p>Manage your music collection</p>
            </header>

            <div className="albums-list">
                {albums.length === 0 ? (
                    <p className="no-albums-message">No albums found. Add one below!</p>
                ) : (
                    <div className="albums-grid">
                        {albums.map((album) => (
                            <div key={album.id} className="album-card">
                                <h3>{album.title}</h3>
                                <p className="album-genre">{album.genre}</p>
                                <p className="album-date">{album.releaseDate ? new Date(album.releaseDate).toLocaleDateString() : ''}</p>
                                <button className="delete-button" onClick={() => handleDeleteAlbum(album.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="add-album-form">
                <h2>Add New Album</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Album Title"
                        value={newAlbum.title}
                        onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    />
                    {/*
                    <input
                        type="text"
                        placeholder="Genre"
                        value={newAlbum.genre}
                        onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })}
                    />
                    */}
                    <input
                        type="date"
                        value={newAlbum.releaseDate}
                        onChange={(e) => setNewAlbum({ ...newAlbum, releaseDate: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Artist Name"
                        value={newAlbum.artist_name}
                        onChange={(e) => setNewAlbum({ ...newAlbum, artist_name: e.target.value })}
                    />
                    <button className="add-button" onClick={handleAddAlbum}>
                        Add Album
                    </button>
                </div>
            </div>

            <div className="navigation-buttons">
                <LogoutButton />
                <button className="back-button" onClick={() => navigate('/artist')}>
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default ArtistAlbums;