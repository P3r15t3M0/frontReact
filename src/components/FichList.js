import { Fich } from "./Fich";
//import { useEffect, useState } from 'react';

export const FichList = ({ fichs }) => {
  console.log(fichs);
  return fichs.length ? (
    <ul>
      {fichs.map((fich) => (
        <li key={fich.id_fich}>
          <Fich fich={fich} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay ficheros para este servicio</p>
  );
};
