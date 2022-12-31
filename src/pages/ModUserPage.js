import { useState, useContext } from "react";
import { AuthContext } from "../contex/AuthContext";
import Button from "@mui/material/Button";
import InputUnstyled from "@mui/base/InputUnstyled";
import { updateUser } from "../services";
import { TextField } from "@mui/material";
import { flexbox } from "@mui/system";

export const ModUserPage = () => {
  const { user, token } = useContext(AuthContext);
  const [alias, setAlias] = useState("");
  const [fecNac, setFecNac] = useState("");
  const [bioText, setBioText] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passO, setPassO] = useState("");
  const [error, setError] = useState("");

  if (!user) return <p>Cargando...</p>;

  const userName = user.info[0].alias ? user.info[0].alias : user.info[0].email;
  const id = user.info[0].id_user;

  const handleSubmit = async () => {
    if (pass1 && pass2 && pass1 !== pass2) {
      setError("Las passwords no coinciden");
      //setEqPass(pass1);
      return false;
    }

    const response = await updateUser(
      id,
      alias,
      email,
      passO,
      pass1,
      bioText,
      photo,
      fecNac,
      token
    );
    window.location.reload();
    return false;
  };

  return (
    <main className="centered">
      <section>
        <form>
          <h1>Cuenta de {userName}</h1>
          <div>
            <label htmlFor="alias">Alias </label>
            <InputUnstyled
              type="text"
              id="alias"
              name="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email </label>
            <InputUnstyled
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <fieldset className="chanPass">
            <legend>Cambiar Password </legend>
            <div>
              <label htmlFor="passO">Password Actual</label>
              <InputUnstyled
                type="password"
                id="passO"
                name="passO"
                value={passO}
                autoComplete="off"
                onChange={(e) => setPassO(e.target.value)}
                style={{ marginRight: "3rem", marginLeft: "1rem" }}
              />
            </div>
            <div>
              <label htmlFor="pass1">Nueva Password</label>
              <InputUnstyled
                type="password"
                id="pass1"
                name="pass1"
                value={pass1}
                autoComplete="off"
                onChange={(e) => setPass1(e.target.value)}
                style={{ marginRight: "3rem", marginLeft: "1rem" }}
              />
            </div>
            <div>
              <label htmlFor="pass2">Repita Password</label>
              <InputUnstyled
                type="password"
                id="pass2"
                name="pass2"
                value={pass2}
                autoComplete="off"
                onChange={(e) => setPass2(e.target.value)}
                style={{ marginRight: "3rem", marginLeft: "1rem" }}
              />
            </div>
          </fieldset>
          <div className="date">
            <label htmlFor="date">Fecha de Nacimiento</label>
            <InputUnstyled
              type="date"
              id="date"
              name="date"
              value={fecNac}
              onChange={(e) => setFecNac(e.target.value)}
            />
          </div>
          <div className="textArea">
            <TextField
              id="bioText"
              name="bioText"
              label="Biografía"
              multiline
              rows={2}
              defaultValue="Escriba aqui..."
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
            />
          </div>
          <div className="upButton">
            <Button variant="contained" component="label">
              Subir Avatar
              <InputUnstyled
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </Button>
          </div>
          {photo ? (
            <p>
              <img
                src={URL.createObjectURL(photo)}
                alt="Nuevo avatar escogido"
                style={{
                  margin: "auto",
                  paddingLeft: "10rem",
                  paddingTop: "1rem",
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </p>
          ) : null}
          <Button
            variant="contained"
            onClick={handleSubmit}
            style={{ marginTop: "1rem" }}
          >
            Actualizar Perfil
          </Button>
        </form>
        <p>{error}</p>
      </section>
    </main>
  );
};
