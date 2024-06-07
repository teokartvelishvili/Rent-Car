import React from 'react';
import CarCard from '../CarCard/CarCard';
import './CardList.css';

const CardList = ({ cars, loading }) => {
  if (loading) {
    return <p>Loading cars...</p>;
  }

  if (!Array.isArray(cars) || cars.length === 0) {
    return <p>No cars available.</p>;
  }

  return (
    <div className="card-list">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CardList;
