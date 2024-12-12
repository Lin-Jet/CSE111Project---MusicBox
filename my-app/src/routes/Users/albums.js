import moment from 'moment';
import "./users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../imgs/logo.png';
import LogoutButton from './LogOutBtn';
import { FaHeart } from 'react-icons/fa';
import { CiHeart, CiChat1 } from 'react-icons/ci';

function Albums() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAlbum, setNewAlbum] = useState({
        album_id: '',
        title: '',
        artist_name: '',
        genre: '',
        release_date: '',
    });
    const [artists, setArtists] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [reviewingAlbumId, setReviewingAlbumId] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [showReviews, setShowReviews] = useState(new Set());

    const [user, setUser] = useState(null); 

    let newFavorites = new Set();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/albums')
            .then(response => {
                const formattedAlbums = response.data.map(album => ({
                    ...album,
                    release_date: moment(album.release_date).format('MM/DD/YYYY')
                }));
                setAlbums(formattedAlbums);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
                setError('Failed to load albums. Please try again later.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/artists')
            .then(response => {
                setArtists(response.data || []);
            })
            .catch(error => {
                console.error('Error fetching artists:', error);
            });
    }, []);

    useEffect(() => {
        // const userId = localStorage.getItem("userId"); 
        const userId = 1;
        if (!userId) {
          navigate("/albums"); // Redirect to login if not logged in
          console.log("Have not logged in")
          return;
        }
    
        axios.get(`/api/user/${userId}`)
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            navigate("/albums"); // Redirect to login on error
            console.log("get user id error")
          });
    }, [navigate]);

    

    const handleAlbumSubmit = async (e) => {
        e.preventDefault();

        if (!newAlbum.title || !newAlbum.artist_name) {
            alert('Title and Artist Name are required');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/albums', newAlbum, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 201) {
                alert('Album added successfully!');
                const addedAlbum = {
                    ...response.data,
                    release_date: moment(response.data.release_date).format('MM/DD/YYYY')
                };
                setAlbums([...albums, addedAlbum]);
                setNewAlbum({ album_id: '', title: '', artist_name: '', genre: '', release_date: '' });
            }
        } catch (error) {
            console.error('Error adding album:', error);
            alert('Failed to add album. Please try again.');
        }
    };

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            newFavorites = new Set(prev);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            navigate('/collection')
            console.log(newFavorites)
            return newFavorites;
        });

    };

    const toggleReview = (id) => {
        if (reviewingAlbumId === id) {
            setReviewingAlbumId(null);
            setReviewText('');
        } else {
            setReviewingAlbumId(id);
            setReviewText('');
        }
    };

    const submitReview = async () => {
        if (!reviewText.trim()) {
            alert("Review text cannot be empty.");
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/reviews', {
                album_id: reviewingAlbumId,
                review_text: reviewText
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 201) {
                alert('Review submitted successfully!');
                setReviewingAlbumId(null);
                setReviewText('');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        }
    };

    const toggleShowReviews = (id) => {
        setShowReviews(prev => {
            const newShowReviews = new Set(prev);
            if (newShowReviews.has(id)) {
                newShowReviews.delete(id);
            } else {
                newShowReviews.add(id);
            }
            return newShowReviews;
        });
    };

    if (loading) {
        return (
            <div className="index-745">
                <header className="index-header-745">
                    <h1 className="line-1-745 anim-typewriter-745">Albums</h1>
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
                    <h1 className="">Albums</h1>
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
            <LogoutButton />
            <header className="index-header-745">
                <h1 className="">Albums</h1>
                <p className="sentence-745">Track favorites, review albums, and connect with other music lovers.</p>
                <img src={logo} alt="Logo" style={{ display: 'none' }} />
            </header>
            <div className="album-list-745" style={{ padding: '20px', height: '500px', overflowY: 'scroll' }}>
                <h2>Album List</h2>
                {albums.length === 0 ? (
                    <h1
                    style ={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px' }}
                    >No albums found.</h1>
                ) : (
                    <ul
                        style={{ listStyleType: 'none',
                            padding: 0,
                        }}
                    >
                        {albums.map(album => (
                            <li key={album.album_id}
                                style={{ marginBottom: '10px', position: 'relative' }}>
                                <strong>{album.title}</strong> by {album.artist_name}
                                <br />
                                Genre: {album.genre}, Released: {album.release_date}

                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        color: 'red',
                                        marginRight: '10px',
                                        marginLeft: '10px'
                                    }}
                                    onClick={() => toggleFavorite(album.album_id)}
                                >
                                    {favorites.has(album.album_id) ? <FaHeart /> : <CiHeart />}
                                </button>

                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        color: '#124ba2'
                                    }}
                                    onClick={() => toggleReview(album.album_id)}
                                >
                                    <CiChat1 />
                                </button>

                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        color: '#124ba2'
                                    }}
                                    onClick={() => toggleShowReviews(album.album_id)}
                                >
                                    {showReviews.has(album.album_id) ? 'Hide Reviews' : 'Show Reviews'}
                                </button>

                                {showReviews.has(album.album_id) && (
                                    <div style={{ marginTop: '10px' }}>
                                        <h3>Reviews:</h3>
                                        {album.reviews.length === 0 ? (
                                            <p>No reviews yet.</p>
                                        ) : (
                                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                                {album.reviews.map(review => (
                                                    <li key={review.review_id} style={{ marginBottom: '10px' }}>
                                                        <p>{review.review_text}</p>
                                                        <small>Reviewed on: {review.review_date}</small>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {reviewingAlbumId === album.album_id && (
                                    <div style={{ marginTop: '10px' }}>
                                        <textarea
                                            placeholder="Write your review..."
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                boxSizing: 'border-box',
                                                marginBottom: '10px'
                                            }}
                                        ></textarea>
                                        <button
                                            style={{
                                                padding: '10px 20px',
                                                backgroundColor: '#124ba2',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={submitReview}
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                )}
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

export default Albums;