export const Service = ({ service }) => {
    //console.log('SERVICE:', service);
    return (
        <article>
            <h3>{service.nombre_servicio}</h3>
            <p><b>Creado por:</b> {service.alias ? service.alias : service.email}</p>
            <p><b>Descripción:</b> {service.description}</p>
            <p>{service.numComentarios} comentarios</p>
        </article>
    );
};