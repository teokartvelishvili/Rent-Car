import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../Hooks/UserContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-content">
                <h1 className="site-name">Speedy Rentals</h1>
                {user && <p>Hello, {user.name}!</p>}
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/NewCarForm">  Add New Car  </Link></li>
                        {user ? (
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        ) : (
                            <li><Link to="/LoginPage">Login</Link></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
