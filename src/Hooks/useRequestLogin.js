import { useState } from 'react';

const useRequestLogin = (url, method) => {
    const [loading, setLoading] = useState(false);

    const sendRequest = async (body) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming the token is stored in localStorage
                },
                body: body && method !== 'GET' ? JSON.stringify(body) : undefined
            });

            const text = await res.text();
            console.log('Raw response text:', text);  // Log the raw response for debugging

            // Check if the response is a JWT token
            if (res.ok && /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+$/.test(text)) {
                return { token: text };
            }

            // Otherwise, assume it's JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (jsonError) {
                throw new Error(`Received non-JSON response from the API: ${text}`);
            }

            setLoading(false);

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return { loading, sendRequest };
};

export default useRequestLogin;
