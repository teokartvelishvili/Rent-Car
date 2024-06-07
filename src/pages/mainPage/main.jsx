import React, { useContext, useState } from 'react';
import UserContext from '../../Hooks/UserContext';
import CardList from '../../components/CardList/CardList';
import TopComponent from '../../components/TopComponent/TopComponent';
import useRequest from '../../Hooks/useRequest';

const MainPage = () => {
    const { user } = useContext(UserContext);
    const [filteredCars, setFilteredCars] = useState([]);
    const { loading, sendRequest } = useRequest(`${process.env.REACT_APP_API_BASE_URL}/api/Car`, 'GET');

    const handleFilterChange = async (filters) => {
        try {
            const queryParams = {
                ...filters,
                pageIndex: 1,
                pageSize: 10
            };

            const queryString = new URLSearchParams(queryParams).toString();

            const data = await sendRequest(`?${queryString}`);
            setFilteredCars(data || []);
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    };

    return (
        <div className="main-page">
            {/* {user && <p>Hello, {user.name}!</p>} */}
            <TopComponent onFilterChange={handleFilterChange} />
            <CardList cars={filteredCars} loading={loading} />
        </div>
    );
};

export default MainPage;
