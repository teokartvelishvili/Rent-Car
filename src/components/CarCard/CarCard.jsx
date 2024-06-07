import React from 'react';
import './CarCard.css';
import defaultImage from '../Assets/no-images.jpeg'; // Import the default image
import JEEP from '../Assets/JEEP.jpeg'; // Import the image for JEEP brand
import MERCEDES from '../Assets/mercedes.jpg'; // Import the image for MERCEDES brand
import TESLA from '../Assets/Tesla.webp'; // Import the image for TESLA brand
import BMW from '../Assets/BMW.jpeg';
import FORD from '../Assets/ford mustang.jpg';
import FERRARI from '../Assets/ferrari.jpeg';
import LAMBORGINI from '../Assets/lamborgini.webp';

const CarCard = ({ car }) => {
    if (!car) {
        return null; // Return null if car object is null or undefined
    }

    // Function to get the image source based on the brand name
    function getImageSource(brand) {
        const lowercaseBrand = brand ? brand.toLowerCase() : ''; // Ensure brand is not null before accessing properties
        switch (lowercaseBrand) {
            case 'jeep':
                return JEEP;
            case 'ferrari':
                return FERRARI;
            case 'lamborgini':
                return LAMBORGINI;
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

    const imageSource = getImageSource(car.brand); // Get image source based on brand

    return (
        <div className="card">
            <img src={imageSource} alt={`${car.brand} ${car.model}`} className="car-image" />
            <div className="card-content">
                <h2 className="car-title">{`${car.brand} ${car.model} (${car.year})`}</h2>
                <p className="car-price">${car.price} per day</p>
                <p className="car-details">Capacity: {car.capacity} persons</p>
                <p className="car-details">Transmission: {car.transmission}</p>
                <p className="car-details">Location: {car.city}</p>
                {/* Additional details */}
                <a href={`/details/${car.id}`} className="details-link">View Details</a>
            </div>
        </div>
    );
};

export default CarCard;
