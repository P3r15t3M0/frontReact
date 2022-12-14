import { Comment } from "./Comment";

export const ComList = ({ comms }) => {
  return comms.length ? (
    <ul>
      {comms.map((comm) => (
        <li key={comm.id_com}>
          <Comment comment={comm} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No hay comentarios para este servicio</p>
  );
};
