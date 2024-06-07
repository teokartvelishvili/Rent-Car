import { useState, useEffect } from 'react';
import useRequest from '../../Hooks/useRequest';

const useCarDetails = (carId) => {
    const [carDetails, setCarDetails] = useState(null);
    const { loading, sendRequest } = useRequest(`/api/Car/${carId}`, 'GET');

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await sendRequest();
                setCarDetails(response.car);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        if (carId) {
            fetchCarDetails();
        }
    }, [carId, sendRequest]);

    return { carDetails, loading };
};

export default useCarDetails;
