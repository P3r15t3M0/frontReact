import { AuthContext } from "../contex/AuthContext";
import { ErrorMessage } from "../components/ErrorMessage";

export const modUserPage = () => {
    const { servs, loading, error } = useServs();
    const { user } = useContext(AuthContext);
    const [alias, setAlias] = useState('');
    const [fecNac, setFecNac] = useState('');
    const [bioText, setBioText] = useState('');
    const [photo, setPhoto] = useState('');


    if(loading) return <p>Cargando lista de servicios...</p>;
    if(error) return <ErrorMessage message={error} />;

    return (
        <main className="centered">

        <section>
            <h1>Cuenta de {user.id}</h1>
            <fieldset>
                <label htmlFor='alias'>Alias</label>
                <input type='text' id='alias' name='alias' /*required*/ onChange={(e) => setAlias(e.target.value)}/>
            </fieldset>
            <fieldset>
                <label htmlFor='date'>Fecha de Nacimiento</label>
                <input type='date' id='date' name='date' /*required*/ onChange={(e) => setFecNac(e.target.value)}/>
            </fieldset>
            <br />
            <fieldset>
            <legend>Biografía</legend>
                <textarea 
                    id='comment' 
                    name="comment" 
                    rows="3" cols="55"
                    value={bioText}
                    onChange={e => setBioText(e.target.value)}>
                </textarea>
            </fieldset>
            <fieldset>
                <input type='file' id='photo' name='photo' onChange={(e) => setPhoto(e.target.value)}/>
            </fieldset>
        </section>
        </main>
    );
};

