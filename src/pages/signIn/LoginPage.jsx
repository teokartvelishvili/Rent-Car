import React, { useState, useContext } from 'react';
import './LoginPage.css';
import useRequestLogin from '../../Hooks/useRequestLogin';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Hooks/UserContext';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
    const [error, setError] = useState('');
    const { loading, sendRequest } = useRequestLogin(`${process.env.REACT_APP_API_BASE_URL}/api/Users/login`, 'POST');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error messages
    
        try {
            const data = await sendRequest(formData);
            console.log('Response data:', data);
    
            if (data.token) {
                localStorage.setItem('token', data.token);
                const payload = JSON.parse(atob(data.token.split('.')[1]));
                console.log('Token payload:', payload);
                setUser({ name: payload.firstName }); // Adjust based on your token's payload structure
                navigate('/');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Login failed');
            } else {
                setError(error.message || 'Login failed');
            }
        }
    };
    
    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={error ? 'error' : ''}
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={error ? 'error' : ''}
                        placeholder="Password"
                        aria-label="Password"
                    />
                </label>
                <div className="signUpLink">
                    <p>Not registered?</p><Link to="/SignUp">Sign up</Link>
                </div>

                {error && <p className="error-message" role="alert">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
