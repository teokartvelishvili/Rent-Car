import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import the jwt-decode library

const DecodedTokenInfo = () => {
    useEffect(() => {
        const token = 'simplekey 1234567890123456 my key simplekey 1234567890123456 my key simplekey 1234567890123456 my key simplekey 1234567890123456 my key'; // Replace 'your-jwt-token' with the actual JWT token

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded token:', decoded);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return (
        <div>
            <h1>Decoded Token Information</h1>
            {/* Render decoded token information here if needed */}
        </div>
    );
};

export default DecodedTokenInfo;
