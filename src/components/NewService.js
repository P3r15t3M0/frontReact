import { useContext, useState } from "react";
import { AuthContext } from "../contex/AuthContext";
import { createNewServiceService } from "../services/index.js";
import { TextField } from "@mui/material";
import InputUnstyled from "@mui/base/InputUnstyled";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export const NewService = () => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [servGroup, setServGroup] = useState("");
  const [desc, setDesc] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSending(true);
      const id = user.info[0].id_user;
      await createNewServiceService(id, title, servGroup, desc, file, token);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
      window.location.reload();
      return false;
    }
  };

  return (
    <form className="input-form">
      <fieldset>
        <legend>Crea un nuevo servicio</legend>
        <TextField
          id="outlined-basic"
          label="Título"
          variant="outlined"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Grupo del servicio</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            className="groupSelect"
            value={servGroup}
            label="Grupo del servicio"
            onChange={(e) => setServGroup(e.target.value)}
          >
            <MenuItem value={"1"}>Imagen y Sonido</MenuItem>
            <MenuItem value={"2"}>Negocios y Marketing</MenuItem>
            <MenuItem value={"3"}>Programacion y Tecnologia</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="textarea"
          label="Descripción"
          multiline
          rows={3}
          required
          variant="standard"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="createServButtons">
          <Button variant="outlined" component="label">
            Subir Archivo
            <InputUnstyled
              type="file"
              id="photo"
              name="photo"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Crear Servicio
          </Button>
        </div>
      </fieldset>
      {sending ? <p>Creando Servicio...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
};
