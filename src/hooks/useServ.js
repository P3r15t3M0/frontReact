import { useEffect, useState } from 'react';
import { getServ } from '../services';

const useServ = (id, token) => {
    const [serv, setServ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadServ = async () => {
            try {
                setLoading(true);

                const data = await getServ(id, token);
                setServ(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        loadServ();

    }, []);

    return { serv, loading, error };
}

export { useServ };