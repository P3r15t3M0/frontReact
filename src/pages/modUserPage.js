import { AuthContext } from "../contex/AuthContext";
import { ErrorMessage } from "../components/ErrorMessage";

export const modUserPage = () => {
    const { servs, loading, error } = useServs();
    const { user } = useContext(AuthContext);

    if(loading) return <p>Cargando lista de servicios...</p>;
    if(error) return <ErrorMessage message={error} />;

    return (
        <section>
            <p>userInfo: {user.info[0]}</p>
            <h1>Lastest Services</h1>
            <ServList servs={servs}/>
        </section>
    );
};

