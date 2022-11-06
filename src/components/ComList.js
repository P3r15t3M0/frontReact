import { Comment } from "./Comment";
import { useEffect, useState } from 'react';

export const ComList = ({comms}) => {

    return comms.length ? (
    <ul>
        {comms.map(comm =>
            <li key={comm.id_service}><Comment comment={comm} />
            </li>            
        )}
    </ul> ) : (
    <p>No hay comentarios para este servicio</p>
    );
};