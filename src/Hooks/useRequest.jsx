import { useState, useCallback } from 'react';

const useRequest = (url, method) => {
    const [loading, setLoading] = useState(false);

    const sendRequest = useCallback(async (body) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: body && method !== 'GET' ? JSON.stringify(body) : undefined
            });

            const text = await res.text();
            console.log('Raw response text:', text);

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
    }, [url, method]);

    return { loading, sendRequest };
};

export default useRequest;