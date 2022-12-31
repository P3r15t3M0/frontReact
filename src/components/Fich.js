export const Fich = ({ fich }) => {
  const path = `uploads/${fich.fich_path}`;
  return (
    <article>
      <p>
        <b>Subido por:</b> {fich.alias ? fich.alias : fich.email}
        <br />
        <a href={`/${path}`} download={`${fich.fich_path}`.split("_")[1]}>
          <img
            src={
              fich.fich_path.split(".")[1] === "pdf"
                ? `${process.env.REACT_APP_BACKEND_ROUTE}uploads/pdf-logo.png`
                : `${process.env.REACT_APP_BACKEND_ROUTE}${path}`
            }
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
