export const Service = ({ service }) => {
    return (
        <article>
            <p>Creado por usuario: {service.id_user}</p>
            <p>Nombre del Servicio: {service.nombre_servicio}</p>
            <p>Descripcion: {service.description}</p>
        </article>
    );
};