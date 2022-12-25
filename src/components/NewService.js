import { useContext, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import { createNewServiceService } from "../services/index.js";
//import jwt_decode from "jwt-decode";
//import { useNavigate } from "react-router-dom";

export const NewService = () => {
  //const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  //const tDec = jwt_decode(token);
  /*const initFormData = {
    idUser: parseInt(`${tDec.id}`),
    title: "",
    desc: "",
    servGroup: 0,
  };*/

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  //const [formData, setFormData] = useState(initFormData);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [servGroup, setServGroup] = useState("");
  const [desc, setDesc] = useState("");

  /*
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
    console.log(e.target.value);
  };
*/
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSending(true);
      /*if (file !== "") {
        formData.append("photitu", file);
      }*/
      const id = user.info[0].id_user;
      //console.log("FORMDATA: ", formData);
      //console.log("FILE: ", file);
      await createNewServiceService(id, title, servGroup, desc, file, token);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
      //setFormData(initFormData);
      //console.log('FORM', formData);
      //console.log('INIT', initFormData);
      window.location.reload();
      return false;
    }
  };

  return (
    <form className="input-form">
      <fieldset>
        <div>
          <legend>Crea un nuevo servicio</legend>
          <label htmlFor="title">Titulo </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="servGroup">Grupo del servicio </label>
          <select
            name="servGroup"
            required
            defaultValue="0"
            value={servGroup}
            onChange={(e) => setServGroup(e.target.value)}
          >
            <option>Seleccione una opción...</option>
            <option value="1">Imagen y Sonido</option>
            <option value="2">Negocios y Marketing</option>
            <option value="3">Programacion y Tecnologia</option>
          </select>
        </div>
        <label htmlFor="desc">Descripción </label>
        <textarea
          type="textarea"
          id="desc"
          name="desc"
          rows="3"
          cols="55"
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Crear Servicio</button>
      </fieldset>
      {sending ? <p>Creando Servicio...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
};
