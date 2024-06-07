import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewCarForm.css';

const NewCarForm = () => {
    const navigate = useNavigate();
    const [carData, setCarData] = useState({
        brand: '',
        model: '',
        year: '',
        price: '',
        capacity: '',
        transmission: '',
        createdBy: '',
        city: '',
        createdByEmail: '',
        fuelCapacity: '',
        image1: null,
        image2: null,
        image3: null,
        latitude: '',
        longitude: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setCarData({ ...carData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        const requiredFields = ['brand', 'model', 'year', 'price', 'capacity', 'transmission', 'createdBy', 'city', 'createdByEmail', 'fuelCapacity', 'latitude', 'longitude'];
        for (const field of requiredFields) {
            if (!carData[field]) {
                setErrorMessage(`Please fill in the ${field} field`);
                return;
            }
        }

        try {
            const formData = new FormData();
            Object.keys(carData).forEach((key) => {
                formData.append(key, carData[key]);
            });

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Car`, requestOptions);
            const data = await res.json();

            if (res.ok) {
                setCarData({
                    brand: '',
                    model: '',
                    year: '',
                    price: '',
                    capacity: '',
                    transmission: '',
                    createdBy: '',
                    city: '',
                    createdByEmail: '',
                    fuelCapacity: '',
                    image1: null,
                    image2: null,
                    image3: null,
                    latitude: '',
                    longitude: ''
                });
                setSuccessMessage('The car has been successfully added');
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setErrorMessage(data.message || 'Error submitting data');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setErrorMessage('Error submitting data');
        }
    };

    return (
        <div>
            <h2>Add a New Car</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="new-car-form" onSubmit={handleSubmit}>
                <label htmlFor="brand">Brand:</label>
                <input type="text" name="brand" id="brand" placeholder="Brand" value={carData.brand} onChange={handleChange} required className="form-input" />

                <label htmlFor="model">Model:</label>
                <input type="text" name="model" id="model" placeholder="Model" value={carData.model} onChange={handleChange} required className="form-input" />

                <label htmlFor="year">Year:</label>
                <input type="number" name="year" id="year" placeholder="Year" value={carData.year} onChange={handleChange} required className="form-input" />

                <label htmlFor="price">Price:</label>
                <input type="number" name="price" id="price" placeholder="Price" value={carData.price} onChange={handleChange} required className="form-input" />

                <label htmlFor="capacity">Capacity:</label>
                <input type="number" name="capacity" id="capacity" placeholder="Capacity" value={carData.capacity} onChange={handleChange} required className="form-input" />

                <label htmlFor="transmission">Transmission:</label>
                <input type="text" name="transmission" id="transmission" placeholder="Transmission" value={carData.transmission} onChange={handleChange} required className="form-input" />

                <label htmlFor="createdBy">Created By:</label>
                <input type="text" name="createdBy" id="createdBy" placeholder="Created By" value={carData.createdBy} onChange={handleChange} required className="form-input" />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" id="city" placeholder="City" value={carData.city} onChange={handleChange} required className="form-input" />

                <label htmlFor="createdByEmail">Created By Email:</label>
                <input type="text" name="createdByEmail" id="createdByEmail" placeholder="Created By Email" value={carData.createdByEmail} onChange={handleChange} required className="form-input" />

                <label htmlFor="fuelCapacity">Fuel Capacity:</label>
                <input type="number" name="fuelCapacity" id="fuelCapacity" placeholder="Fuel Capacity" value={carData.fuelCapacity} onChange={handleChange} required className="form-input" />

                <label htmlFor="image1">Image 1:</label>
                <input type="file" name="image1" id="image1" onChange={handleFileChange} className="form-input" />

                <label htmlFor="image2">Image 2:</label>
                <input type="file" name="image2" id="image2" onChange={handleFileChange} className="form-input" />

                <label htmlFor="image3">Image 3:</label>
                <input type="file" name="image3" id="image3" onChange={handleFileChange} className="form-input" />

                <label htmlFor="latitude">Latitude:</label>
                <input type="number" name="latitude" id="latitude" placeholder="Latitude" value={carData.latitude} onChange={handleChange} required className="form-input" />

                <label htmlFor="longitude">Longitude:</label>
                <input type="number" name="longitude" id="longitude" placeholder="Longitude" value={carData.longitude} onChange={handleChange} required className="form-input" />

                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default NewCarForm;
