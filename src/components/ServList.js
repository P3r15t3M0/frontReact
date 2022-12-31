import { Service } from "./Service";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";

export const ServList = ({ servs }) => {
  const { user } = useContext(AuthContext);

  const styleColor = (serv) => {
    let style = "";
    if (serv.resuelto === 0) {
      style = "yellow";
    } else if (serv.resuelto === 1) {
      style = "red";
    } else {
      style = "green";
    }
    return style;
  };

  return servs.length ? (
    <ul className="listServices">
      {servs.map((serv) => (
        <li
          key={serv.id_service}
          className="taskCard"
          data-color={styleColor(serv)}
        >
          {user ? (
            <Link to={`/serv/${serv.id_service}`}>
              <Service service={serv} />
            </Link>
          ) : (
            <Service service={serv} />
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay servicios creados</p>
  );
};
