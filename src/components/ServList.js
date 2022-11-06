import { Service } from "./Service";
import { Link } from "react-router-dom";

export const ServList = ({servs}) => {
    return servs.length ? (
    <ul>
        {servs.map(serv =>
        <>
            <Link to={{pathname: `/serv/${serv.id_service}`}} 
            state = {{servId: serv.id_service, 
            servName: serv.nombre_servicio,
            servUs: serv.id_user,
            servDesc: serv.description
            }} style={{textDecoration: 'none', color: 'black'}}>
                <li key={serv.id_service}><Service service={serv} />
                </li>
            </Link>
        </>)}
    </ul> ) : (
    <p>No hay servicios creados</p>
    );
};