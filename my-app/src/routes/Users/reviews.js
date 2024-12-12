import "./users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../../imgs/logo.png";
import LogoutButton from './LogOutBtn';

function Reviews() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/reviews')
            .then(response => {
                setReviews(response.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
                setError('Failed to load reviews. Please try again later.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="reviews-page-946">
                <header className="reviews-header-946">
                    <h1 className="title-946">Reviews</h1>
                    <p className="info-946">Loading reviews, please wait...</p>
                </header>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reviews-page-946">
                <LogoutButton/>
                <header className="reviews-header-946">
                    <h1 className="title-946">Reviews</h1>
                    <p className="info-946">{error}</p>
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
                    onClick={() => navigate('/index')}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="reviews-page-946">
            <LogoutButton />
            <header className="reviews-header-946">
                <h1 className="title-946">Reviews</h1>
                <p className="info-946">Read and share your thoughts on albums.</p>
                <img src={logo} alt="Logo" style={{ display: 'none' }} />
            </header>
            <div className="reviews-list-946" style={{ padding: '20px', height: '500px', overflowY: 'scroll'}}>
                <h2 className="sub-title-946">Review List</h2>
                {reviews.length === 0 ? (
                    <h1 style={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px' }}>
                        No reviews found.
                    </h1>
                ) : (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {reviews.map(review => (
                            <li key={review.review_id} style={{ marginBottom: '10px' }}>
                                <strong>{review.album_title}</strong>
                                <p>{review.review_text}</p>
                                <br />
                                Posted on: {review.review_date}
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

export default Reviews;