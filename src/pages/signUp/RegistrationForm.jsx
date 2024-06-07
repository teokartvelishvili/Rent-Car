import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import useRequest from '../../Hooks/useRequest';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { loading, sendRequest } = useRequest(`${process.env.REACT_APP_API_BASE_URL}/api/Users/register`, 'POST');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key} is required`;
            }
        });
        if (formData.password && formData.repeatPassword && formData.password !== formData.repeatPassword) {
            newErrors.repeatPassword = "Passwords do not match";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            try {
                const data = await sendRequest(formData);
                console.log('Registration successful:', data);
                setSuccessMessage('Registration completed successfully!');
            } catch (error) {
                setServerError(error.message || 'Registration failed');
            }
        } else {
            setErrors(newErrors);
        }
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate('/LoginPage');
            }, 2000);
            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [successMessage, navigate]);

    return (
        <div className="registration-form-container">
            <form className="registration-form" onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="First Name"
                    />
                </label>
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                <label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="Last Name"
                    />
                </label>
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                <label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={errors.phoneNumber ? 'error' : ''}
                        placeholder="Phone Number"
                    />
                </label>
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                <label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Email"
                    />
                </label>
                {errors.email && <p className="error-message">{errors.email}</p>}
                <label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Password"
                    />
                </label>
                {errors.password && <p className="error-message">{errors.password}</p>}
                <label>
                    <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        className={errors.repeatPassword ? 'error' : ''}
                        placeholder="Repeat Password"
                    />
                </label>
                {errors.repeatPassword && <p className="error-message">{errors.repeatPassword}</p>}
                {serverError && <p className="error-message">{serverError}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" disabled={loading}>Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;
