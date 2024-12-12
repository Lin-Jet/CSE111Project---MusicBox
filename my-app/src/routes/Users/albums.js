import "./users.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../imgs/logo.png';
import LogoutButton from './LogOutBtn';

function Albums  () {

    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [user, setUser] = useState(null); 

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/albums')
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

    useEffect(() => {
        // const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
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

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/albums')
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
                            <li key={album.album_id} style={{ marginBottom: '10px' }}>
                                <strong>{album.title}</strong> by {album.artist}
                                <br />
                                Genre: {album.genre}, Released: {album.release_date}
                                <button
                                    style={{
                                        padding: '10px 20px',
                                        marginLeft: '40rem',
                                        borderRadius: '8px',
                                        backgroundColor: '#124ba2',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => navigate(`/api/user_collection/${user.user_id}`)}
                                >
                                    Add To Collection
                                </button>
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

// function Albums() {
//     const navigate = useNavigate();
//     const [albums, setAlbums] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [newAlbum, setNewAlbum] = useState({
//         album_id: '',
//         title: '',
//         artist_name: '',
//         genre: '',
//         release_date: '',
//     });

//     const [artists, setArtists] = useState([]);



//     useEffect(() => {
//         axios.get('http://127.0.0.1:5000/api/artists')
//             .then(response => {
//                 setArtists(response.data || []);
//             })
//             .catch(error => {
//                 console.error('Error fetching artists:', error);
//             });
//     }, []);

//     const handleAlbumSubmit = async (e) => {
//         e.preventDefault();

//         if (!newAlbum.title || !newAlbum.artist_name) {
//             alert('Title and Artist Name are required');
//             return;
//         }

//         try {
//             const response = await axios.post('http://127.0.0.1:5000/api/albums', newAlbum, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             console.log('New album response:', response.data);
//             if (response.status === 201) {
//                 alert('Album added successfully!');
//                 setAlbums([...albums, response.data]);
//                 setNewAlbum({ album_id: '', title: '', artist_name: '', genre: '', release_date: '' });
//             }
//         } catch (error) {
//             console.error('Error adding album:', error);
//             alert('Failed to add album. Please try again.');
//         }
//     };

//     if (loading) {
//         return (
//             <div className="index-745">
//                 <header className="index-header-745">
//                     <h1 className="line-1-745 anim-typewriter-745">Albums</h1>
//                     <p className="sentence-745">Loading albums, please wait...</p>
//                 </header>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="index-745">
//                 <LogoutButton/>
//                 <header className="index-header-745">
//                     <h1 className="">Albums</h1>
//                     <p className="sentence-745">{error}</p>
//                 </header>
//                 <button
//                     style={{
//                         padding: '10px 20px',
//                         margin: '20px 0',
//                         borderRadius: '8px',
//                         backgroundColor: '#124ba2',
//                         color: '#fff',
//                         border: 'none',
//                         cursor: 'pointer',
//                         position: 'center'
//                     }}
//                     onClick={() => navigate('/index')}
//                 >
//                     Go Back
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="index-745">
//             <LogoutButton />
//             <header className="index-header-745">
//                 <h1 className="">Albums</h1>
//                 <p className="sentence-745">Track favorites, review albums, and connect with other music lovers.</p>
//                 <img src={logo} alt="Logo" style={{ display: 'none' }} />
//             </header>
//             <div className="album-list-745" style={{ padding: '20px' }}>
//                 <h2>Album List</h2>
//                 {albums.length === 0 ? (
//                     <h1
//                     style ={{ color: '#ffffff', fontWeight: 'bold', marginBottom: '10px' }}
//                     >No albums found.</h1>
//                 ) : (
//                     <ul style={{ listStyleType: 'none', padding: 0 }}>
//                         {albums.map(album => (
//                             <li key={album.album_id} style={{ marginBottom: '10px' }}>
//                                 <strong>{album.title}</strong> by {album.artist}
//                                 <br />
//                                 Genre: {album.genre}, Released: {album.release_date}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>

//             <form onSubmit={handleAlbumSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//                 <input
//                     type="text"
//                     placeholder="Album Title"
//                     value={newAlbum.title}
//                     onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Artist Name"
//                     value={newAlbum.artist_name}
//                     onChange={(e) => setNewAlbum({ ...newAlbum, artist_name: e.target.value })}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Genre"
//                     value={newAlbum.genre}
//                     onChange={(e) => setNewAlbum({ ...newAlbum, genre: e.target.value })}
//                 />
//                 <input
//                     type="date"
//                     value={newAlbum.release_date}
//                     onChange={(e) => setNewAlbum({ ...newAlbum, release_date: e.target.value })}
//                 />
//                 <button
//                     type="submit"
//                     style={{
//                         padding: '10px 20px',
//                         backgroundColor: '#124ba2',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '8px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     Add Album
//                 </button>
//             </form>

//             <button
//                 style={{
//                     padding: '10px 20px',
//                     margin: '20px 0',
//                     borderRadius: '8px',
//                     backgroundColor: '#124ba2',
//                     color: '#fff',
//                     border: 'none',
//                     cursor: 'pointer'
//                 }}
//                 onClick={() => navigate('/index')}
//             >
//                 Go Back
//             </button>
//         </div>
//     );
// }

// export default Albums;