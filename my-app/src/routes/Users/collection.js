import moment from 'moment';
import "./users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../../imgs/logo.png";
import LogoutButton from './LogOutBtn';

function Collection() {
    const navigate = useNavigate();
    const [collectionList, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect triggered");
        axios.get('http://127.0.0.1:5000/api/collection')
            .then(response => {
                console.log("API response:", response.data);
                setCollection(response.data || []);
                setLoading(false);
                console.log(collectionList)
            })
            .catch(error => {
                console.error('Error fetching Collection:', error);
                setError('Failed to load Collections. Please try again later.');
                setLoading(false);
            });
    }, []);

    // const handleRemoveFromCollection = (albumId) => {
    //     axios.post('http://127.0.0.1:5000/api/remove_from_collection', {
    //         user_id: 1,
    //         album_id: albumId
    //     })
    //     .then(() => {
    //         setAlbums(albums.filter(album => album.album_id !== albumId));
    //     })
    //     .catch(error => {
    //         console.error('Error removing album:', error);
    //     });
    // };

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
                <h1 className="">My Collections</h1>
                <p className="sentence-745">View all all your liked songs</p>
                <img src={logo} alt="Logo" style={{ display: 'none' }} />
            </header>
            <div className="album-list-745" style={{ padding: '20px' }}>
                <h2>Collection List</h2>
                {collectionList.length === 0 ? (
                    <h1
                        style ={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px'}}
                    >No collectionList found.</h1>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {collectionList.map(collection => (
                            <li key={collection.album_id} style={{ marginBottom: '10px' }}>
                                <strong className="collection-title">{collection.title}</strong> 
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
                onClick={() => navigate('/index')}
            >
                Go Back
            </button>
        </div>
    );
}

export default Collection;