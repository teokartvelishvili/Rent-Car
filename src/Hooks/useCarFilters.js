import { useState, useEffect, useCallback } from 'react';
import useRequest from './useRequest';

const useCarFilters = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendRequest } = useRequest(`${process.env.REACT_APP_API_BASE_URL}/api/Car/filter`, 'POST');

  const applyFilters = useCallback(async (filters) => {
    try {
      setLoading(true);
      const data = await sendRequest(filters);
      setCars(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error applying filters:', error);
      setCars([]);
      setLoading(false);
    }
  }, [sendRequest]);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        setLoading(true);
        const data = await sendRequest({});
        setCars(data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setCars([]);
        setLoading(false);
      }
    };

    fetchAllCars();
  }, [sendRequest]);

  return { cars, loading, applyFilters };
};

export default useCarFilters;
