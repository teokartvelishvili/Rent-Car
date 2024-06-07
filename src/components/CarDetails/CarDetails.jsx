import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRequest from '../../Hooks/useRequest';
import useDeleteCar from '../../Hooks/deleteCarEndpoint';
import DeleteModal from '../DeleteModal/DeleteModal';
import './CarDetails.css';
import defaultImage from '../Assets/no-images.jpeg';
import JEEP from '../Assets/JEEP.jpeg';
import MERCEDES from '../Assets/mercedes.jpg';
import TESLA from '../Assets/Tesla.webp';
import BMW from '../Assets/BMW.jpeg';
import FORD from '../Assets/ford mustang.jpg';
import FERRARI from '../Assets/ferrari.jpeg';
import LAMBORGHINI from '../Assets/lamborgini.webp';

function getImageSource(brand) {
    const lowercaseBrand = brand ? brand.toLowerCase() : '';
    switch (lowercaseBrand) {
        case 'jeep':
            return JEEP;
        case 'ferrari':
            return FERRARI;
        case 'lamborghini':
            return LAMBORGHINI;
        case 'bmw':
            return BMW;
        case 'mercedes':
            return MERCEDES;
        case 'tesla':
            return TESLA;
        case 'ford':
            return FORD;
        default:
            return defaultImage;
    }
}

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { loading, sendRequest } = useRequest(`${process.env.REACT_APP_API_BASE_URL}/api/Car/${id}`, 'GET');
    const { deleteCar, loading: deleteLoading, error, success } = useDeleteCar();

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const data = await sendRequest();
                setCar(data);
            } catch (error) {
                console.error('Failed to fetch car details:', error);
            }
        };
        fetchCar();
    }, [id, sendRequest]);

    const handleDelete = async (phoneNumber) => {
        try {
            await deleteCar(id, phoneNumber);
        } catch (err) {
            console.error('Failed to delete car:', err);
        }
    };

    useEffect(() => {
        if (success) {
            setDeleteMessage('Car deleted successfully');
            setModalIsOpen(false);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else if (error) {
            setDeleteMessage('Failed to delete car');
        }
    }, [success, error, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!car) {
        return <div>Car not found</div>;
    }

    const imageSource = getImageSource(car.brand);

    return (
        <div className="car-details-container">
            {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
            <img src={imageSource} alt={`${car.brand} ${car.model}`} className="car-details-image" />
            <div className="car-details-content">
                <h2>{`${car.brand} ${car.model} (${car.year})`}</h2>
                <p className="car-price">${car.price} per day</p>
                <p className="car-details">Capacity: {car.capacity} persons</p>
                <p className="car-details">Transmission: {car.transmission}</p>
                <p className="car-details">Location: {car.city}</p>
                <p className="car-details">Fuel Capacity: {car.fuelCapacity} liters</p>
                <p className="car-details">Created By: {car.createdBy}</p>
                <p className="car-details">Created By Email: {car.createdByEmail}</p>
                <p className="car-details">Latitude: {car.latitude}</p>
                <p className="car-details">Longitude: {car.longitude}</p>
                <p className="car-details">Owner Phone Number: {car.ownerPhoneNumber || 'N/A'}</p>
                <button className="rent-button">Rent Now</button>
                <button onClick={() => setModalIsOpen(true)} className="delete-button">Delete Car</button>
            </div>
            <DeleteModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default CarDetails;


