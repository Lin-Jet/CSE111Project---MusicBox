import "./App.scss";
import { useNavigate } from "react-router-dom";
import LogoutButton from './Users/LogOutBtn';

function Index({ onSignIn }) {
    const navigate = useNavigate();

    return (
        <div className="index">
            <LogoutButton />
            <header
                className="index-header"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh'
                }}
            >
                <h1 className="line-1 anim-typewriter"
                    style={{
                        marginBottom: '30%',
                        marginLeft: '18%',
                    }}
                >Welcome to Back</h1>
                <p className="sentence">Track favorites, review albums, and connect with other music lovers.</p>
            </header>
            <div className="index-nav">
                <button
                    className="button-89"
                    style={{
                        padding: 10,
                        margin: 10,
                        borderRadius: 8,
                        backgroundColor: '#124ba2',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/albums')}
                >
                    View Albums
                </button>
                <button
                    className="button-89"
                    style={{
                        padding: 10,
                        margin: 10,
                        borderRadius: 8,
                        backgroundColor: '#124ba2',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/reviews')}
                >
                    Your Reviews
                </button>
                <button
                    className="button-89"
                    style={{
                        padding: 10,
                        margin: 10,
                        borderRadius: 8,
                        backgroundColor: '#124ba2',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/collection')}
                >
                    My Collection
                </button>
            </div>
        </div>
    );
}

export default Index;