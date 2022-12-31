import { Fich } from "./Fich";

export const FichList = ({ fichs }) => {
  return fichs.length ? (
    <ul>
      {fichs.map((fich) => (
        <li key={fich.id_fich}>
          <Fich fich={fich} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="info">No hay ficheros para este servicio</p>
  );
};
