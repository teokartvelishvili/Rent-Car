import React, { useContext } from 'react';
import './Loading.css';
import UserContext from '../../Hooks/UserContext'; // Import UserContext if loading state is managed there

const Loading = () => {
    const { loading } = useContext(UserContext); // Access loading state from UserContext or your global state

    return loading && <div className="loading-overlay"><div className="loading-spinner"></div></div>;
};

export default Loading;
