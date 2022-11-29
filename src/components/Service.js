export const Service = ({ service }) => {
    return (
        <article>
            <p>Creado por usuario: {service.alias ? service.alias : service.email}</p>
            <p>Nombre del Servicio: {service.nombre_servicio}</p>
            <p>Descripcion: {service.description}</p>
            <p>{service.numComentarios} comentarios</p>
        </article>
    );
};