import { useEffect, useState } from 'react';
import { jobChecker } from '../services';

export const useJobs = (idU, idS, token) => {
    const [jobs, setJobs] = useState(0);
    const [errorJob, setErrorJob] = useState("");

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const data = await jobChecker(idU, idS, token);
                setJobs(data);
                //console.log('jobs', jobs);
                //console.log('data', data);

            } catch (error) {
                setErrorJob(error.message);
            }
        }

        loadJobs();

    }, [idS]);

    return { jobs, errorJob };
};
