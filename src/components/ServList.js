import { Service } from "./Service";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";


export const ServList = ({servs}) => {
    const { user } = useContext(AuthContext);

    return servs.length ? (
    <ul className="listServices">
        {servs.map(serv =>
        <li key={serv.id_service}>
            {user ? (
                <Link to={{pathname: `/serv/${serv.id_service}`}}>
                <Service service={serv} />
            </Link>
            ) : (    
                <Service service={serv} />
            )}
            
        </li>)}
    </ul> ) : (
    <p>No hay servicios creados</p>
    );
};