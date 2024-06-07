import { useEffect, useState } from 'react';

const useFetch = ({ url, method = 'GET' }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_API_BASE_URL}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error('Response failed');
                return res.json();
            })
            .then(data => setResponse(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));

        return () => {
            setResponse(null);
            setError(null);
            setLoading(false);
        };
    }, [url, method]);

    return { response, error, loading };
};

export default useFetch;
