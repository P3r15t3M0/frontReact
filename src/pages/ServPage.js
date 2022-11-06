import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Service } from '../components/Service';
import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { deleteMyServByIdService, newJobService } from "../services/index";
import { ComInput } from "../components/ComInput";
import { ComList } from "../components/ComList";
import { useComms } from "../hooks/useComms";
import { useJobs } from "../hooks/useJobs";
//import { tabScrollButtonClasses } from "@mui/material";

export const ServPage = () => {
    const jId = localStorage.getItem('idJob');
    const { user, token } = useContext(AuthContext);
    const serv = useLocation();
    const [ disabledDel, setDisabledDel ] = useState(true);
    const [ disabledRes, setDisabledRes ] = useState(true);
    const [ disabledAcc, setDisabledAcc ] = useState(false);
    const [ error, setError ] = useState({});
    const { comms, errorComms } = useComms(serv.state.servId, token);
    const [ servIdUs, setServIdUs] = useState(0);
    const [ accJob, setAccJob ] = useState(0);
    const [ jobId, setJobId ] = useState(0);
    //setAccJob(useJobs(servIdUs, window.location.href.split('/')[4], token));

    useEffect(() => {
        if (serv) {
            
            setServIdUs(+serv.state.servUs);
        }

        (!serv || !user) ? setDisabledDel(true) :
        (+serv.state.servUs === +user.info[0].id_user) ?
        setDisabledDel(false) :
        setDisabledDel(true)
    }, [serv]);

    useEffect(() => {
        if (jId) setJobId(jId);
        if (servIdUs && servIdUs === user.info[0].id_user) setDisabledAcc(true);
        if (accJob && accJob > 0) {
            setDisabledAcc(true);
            setDisabledRes(false);
        }
    });

    const handleDeleteClick = async () => {
        try {
            const params = window.location.href.split('/')[4];
            const servi = await deleteMyServByIdService(params, token);

        } catch (error) {
            setError(error.message);
        } finally {
        }
    };
    
    const handleResolveClick = async () => {
        try {
            console.log('Todo bien, todo correcto');

        } catch (error) {
            setError(error.message);
        } finally {
        }
    };

    const handleAcceptClick = async () => {
        try {
            const idServ = window.location.href.split('/')[4];
            if (user.info[0].id_user !== servIdUs) {
                const response = await newJobService(servIdUs, +idServ, user.info[0].id_user, token);
                
                setAccJob(response);
                localStorage.setItem('idJob', response.data.id_jobs);
                setJobId(response.data.id_jobs);
            }


        } catch (error) {
            setError(error.message);
        } finally {
            setDisabledAcc(true);
            setDisabledRes(false);
        }
    };

    return user  ? (
        <section>
            <h1>Service {serv.state.servId}</h1>
            <Service service={{nombre_servicio: serv.state.servName,
            description: serv.state.servDesc,
            id_user: serv.state.servUs
            }}/>
            <div className='buttons'>
                <Link to={{pathname: '/'}} style={{textDecoration: 'none'}}> 
                    <Button variant="outlined" disabled={disabledDel} 
                    startIcon={<DeleteIcon />} color="error" onClick={handleDeleteClick}>
                        Borrar
                    </Button>                       
                </Link>
                            
                <Button variant="outlined" disabled={disabledRes} 
                    startIcon={<CheckCircleOutlineIcon />} color="success" onClick={handleResolveClick}>
                    Resolver
                </Button> 

                <Button variant="outlined" disabled={disabledAcc} 
                    startIcon={<AssignmentIcon />} color="warning" onClick={handleAcceptClick}>
                    Aceptar Trabajo
                </Button>
            </div>
            <ComInput servId={serv.state.servId}/>
            <ComList comms={comms}/>
        </section>
    ) : (
        <>
            <p>No puedes ver los detalles de un servicio</p>
            <p>si no te has loggeado todavía...</p>
        </>
    );
};