import { useState } from 'react';

const useDeleteCar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const deleteCar = async (carId, phoneNumber) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/Car/${phoneNumber}/delete/${carId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete car');
            }
            setSuccess('Car deleted successfully');
        } catch (err) {
            setError('Failed to delete car');
        } finally {
            setLoading(false);
        }
    };

    return { deleteCar, loading, error, success };
};

export default useDeleteCar;
