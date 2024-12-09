import './artist.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Users/LogOutBtn';

function Artist_albums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState({ title: '', genre: '', releaseDate: '' });

    const handleAddAlbum = () => {
        if (newAlbum.title && newAlbum.genre && newAlbum.releaseDate) {
            setAlbums([...albums, newAlbum]);
            setNewAlbum({ title: '', genre: '', releaseDate: '' });
        } else {
            alert('Please fill out all fields to add an album.');
        }
    };

    return (
        <div className="artist-albums-548">
            <header className="artist-albums-header-548">
                <h1>Welcome to Your Albums Page</h1>
                <p>Here, you can manage and add new albums to your collection.</p>
            </header>

            <div className="albums-list-548">
                <h2>Your Albums</h2>
                {albums.length === 0 ? (
                    <p>No albums found. Add your first album below!</p>
                ) : (
                    <ul>
                        {albums.map((album, index) => (
                            <li key={index}>
                                <strong>{album.title}</strong> - {album.genre} ({album.releaseDate})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="add-album-548">
                <h2>Add a New Album</h2>
                <input
                    type="text"
                    placeholder="Album Title"
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={newAlbum.genre}
                    onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Release Date"
                    value={newAlbum.releaseDate}
                    onChange={(e) => setNewAlbum({ ...newAlbum, releaseDate: e.target.value })}
                />
                <button onClick={handleAddAlbum}>Add Album</button>
            </div>

            <div className="artist-logout-548">
                <LogoutButton />
                <button onClick={() => navigate('/artist')}>Back to Artist Dashboard</button>
            </div>
        </div>
    );
}

export default Artist_albums;