import { useState, useContext } from "react";
import { AuthContext } from "../contex/AuthContext";
import Button from "@mui/material/Button";
//import { ErrorMessage } from "../components/ErrorMessage";
import { updateUser } from "../services";
//import { useUser } from "../hooks/useUser";

export const ModUserPage = () => {
  //const { servs, loading, error } = useServs();
  const { user, token } = useContext(AuthContext);
  const [alias, setAlias] = useState("");
  const [fecNac, setFecNac] = useState("");
  const [bioText, setBioText] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passO, setPassO] = useState("");
  const [eqPass, setEqPass] = useState("");

  if (!user) return <p>Cargando...</p>;

  //console.log(token);
  //const { data, loading, error } = useUser(token);
  //console.log(data, alias, fecNac, photo, loading, error);+
  const userName = user.info[0].alias ? user.info[0].alias : user.info[0].email;
  const id = user.info[0].id_user;

  const handleSubmit = async () => {
    //console.log("DATA: ", data);
    if (pass1 && pass2 && pass1 == pass2) {
      setEqPass(pass1);
    }

    const response = await updateUser(
      id,
      alias,
      email,
      passO,
      eqPass,
      bioText,
      photo,
      fecNac,
      token
    );
    //console.log(photo);
    console.log(response);
    window.location.reload();
    return false;
  };

  /*
    const { token } = useContext(AuthContext);
    const data = await getMyUserData(token);
    console.log('DATA::==::', data);
*/

  //if(loading) return <p>Cargando lista de servicios...</p>;
  //if(error) return <ErrorMessage message={error} />;
  //console.log('USERRRRR____', user.info[0].alias ? user.info[0].alias : user.info[0].email);
  return (
    <main className="centered">
      <section>
        <form>
          <h1>Cuenta de {userName}</h1>
          <div>
            <label htmlFor="alias">Alias </label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <fieldset>
            <legend>Cambiar Password </legend>
            <div>
              <label htmlFor="passO">Password Actual</label>
              <input
                type="password"
                id="passO"
                name="passO"
                value={passO}
                autoComplete="off"
                onChange={(e) => setPassO(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pass1">Nueva Password</label>
              <input
                type="password"
                id="pass1"
                name="pass1"
                value={pass1}
                autoComplete="off"
                onChange={(e) => setPass1(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pass2">Repita Password</label>
              <input
                type="password"
                id="pass2"
                name="pass2"
                value={pass2}
                autoComplete="off"
                onChange={(e) => setPass2(e.target.value)}
              />
            </div>
          </fieldset>
          <div>
            <label htmlFor="date">Fecha de Nacimiento</label>
            <input
              type="date"
              id="date"
              name="date"
              value={fecNac}
              onChange={(e) => setFecNac(e.target.value)}
            />
          </div>
          <div>
            <legend>Biografía</legend>
            <textarea
              id="comment"
              name="comment"
              rows="3"
              cols="55"
              value={bioText}
              onChange={(e) => setBioText(e.target.value)}
            ></textarea>
          </div>
          <div>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          {photo ? (
            <p>
              <img
                src={URL.createObjectURL(photo)}
                alt="Nuevo avatar escogido"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </p>
          ) : null}
          <Button variant="contained" onClick={handleSubmit}>
            Actualizar Perfil
          </Button>
        </form>
      </section>
    </main>
  );
};
