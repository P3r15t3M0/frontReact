export const Fich = ({ fich }) => {
  const path = `uploads/${fich.fich_path}`;

  return (
    <article>
      <p>
        <b>Subido por:</b> {fich.id_user}
        <a href={`/${path}`} download={`${fich.fich_path}`}>
          <img
            src={`${process.env.REACT_APP_BACKEND_ROUTE}${path}`}
            alt={`fichero ${fich.id_fich}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </a>
      </p>
    </article>
  );
};
