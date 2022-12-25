import { useEffect, useState } from 'react';
import { getAllServs } from '../services';

const useServs = () => {
    // FIRMA Que el back devuelva tambien username, 
    // email, resuelto o no y numero commentarios de cada servicio
    const [servs, setServs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadServs = async () => {
            try {
                setLoading(true);

                const data = await getAllServs();

                setServs(data);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        loadServs();

    }, []);

    return { servs, loading, error };
}

export { useServs };