import { useContext, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import { createNewServiceService } from "../services/index.js";
import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";




export const NewService = () => {
    //const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const tDec = jwt_decode(token);
    const initFormData = {
        idUser: parseInt(`${tDec.id}`),
        title: '',
        desc: '',
        servGroup: 0
    };

    const [ error, setError ] = useState('');
    const [ sending, setSending ] = useState(false);
    const [ formData, setFormData ] = useState(initFormData);
    //const [ serLis, setSerLis ] = useState(localStorage.getItem('servList'));

    const handleChange = (e) => {
        setFormData({
          ...formData,
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      };

      const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setSending(true);

            await createNewServiceService(formData, token);
            
        } catch (error) {
            setError(error.message);
        } finally {
            setSending(false);
            setFormData(initFormData);
            window.location.reload();
            return false;
        }
      };

    return (
        <form>
            <fieldset>
                <legend>Crea un nuevo servicio</legend>
                <label htmlFor="title">Titulo  </label>
                <input type="text" id="title" name="title" required onChange={handleChange}/>
                <label htmlFor="desc">Descripción  </label>
                <input type="text" id="desc" name="desc" required onChange={handleChange}/>
                <label htmlFor="servGroup">Grupo del servicio  </label>
                <input type="text" id="servGroup" name="servGroup" required onChange={handleChange}/>
                <button onClick={handleSubmit}>Crear Servicio</button>
            </fieldset>
            {sending ? <p>Creando Servicio...</p> : null}
            {error ? <p>{error}</p> : null}
        </form>
    );
};
