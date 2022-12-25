import { useEffect, useState } from 'react';
import { getAllComms } from '../services';

export const useComms = (id, token) => {
    const [comms, setComms] = useState([]);
    const [errorComm, setErrorComm] = useState("");

    useEffect(() => {
        const loadComms = async () => {
            try {
                const data = await getAllComms(id, token);
                setComms(data);

            } catch (error) {
                setErrorComm(error.message);
            }
        }

        loadComms();

    }, [id]);

    return { comms, errorComm };
};
