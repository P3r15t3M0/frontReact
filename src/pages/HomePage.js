import { useServs } from "../hooks/useServs";
import { useContext } from "react";
import { NewService } from "../components/NewService";
import { ServList } from "../components/ServList";
import { AuthContext } from "../contex/AuthContext";
import { ErrorMessage } from "../components/ErrorMessage";

export const HomePage = () => {
  const { servs, loading, error } = useServs();
  const { user } = useContext(AuthContext);
  //const servi = useLocation();

  if (loading) return <p>Cargando lista de servicios...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main>
      <section>
        {user ? <NewService /> : null}
        <h2>Lastest Services</h2>
        <ServList servs={servs} />
      </section>
    </main>
  );
};
