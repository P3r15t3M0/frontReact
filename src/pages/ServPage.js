import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatIcon from "@mui/icons-material/Chat";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  deleteMyServByIdService,
  newJobService,
  solvJob,
  uploadFile,
} from "../services/index";
import { FichList } from "../components/FichList";
import { ComList } from "../components/ComList";
import { useServ } from "../hooks/useServ";
import { ErrorMessage } from "../components/ErrorMessage";
import { newCommentaryService } from "../services/index";
import { TextField } from "@mui/material";

export const ServPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [err, setErr] = useState("");
  const [file, setFile] = useState("");
  const { user, token } = useContext(AuthContext);

  const { serv, error, loading } = useServ(id, token);

  if (error) setErr(error);
  if (loading) return <p>Cargando datos servicio...</p>;
  if (err) return <ErrorMessage message={err} />;

  const handleDeleteClick = async () => {
    await deleteMyServByIdService(id, token);
    navigate("/");
  };

  const handleAcceptClick = async () => {
    await newJobService(
      id,
      serv.message.infoService[0].id_user,
      user.info[0].id_user,
      token
    );
    window.location.reload();
    return false;
  };

  const handleResolveClick = async () => {
    await solvJob(id, token);
    window.location.reload();
    return false;
  };

  const handleComInput = async (e) => {
    try {
      e.preventDefault();
      if (commentText !== "") {
        await newCommentaryService(id, user.info[0].email, commentText, token);
        window.location.reload();
        return false;
      }
    } catch (error) {
      setErr(error);
    } finally {
      document.getElementById("comment").value = "";
    }
  };

  const handleUploadFile = async () => {
    const response = await uploadFile(id, user.info[0].id_user, file, token);
    window.location.reload();
    return false;
  };

  return (
    <main className="servCent">
      <section className="servPage">
        {user && Object.keys(serv).length !== 0 ? (
          <section className="servInfoCenter">
            <h3>{serv.message.infoService[0].nombre_servicio.toUpperCase()}</h3>
            <p>
              <b>Creado por:</b>{" "}
              {serv.message.infoService[0].alias
                ? serv.message.infoService[0].alias
                : serv.message.infoService[0].email}
            </p>
            <p>
              <b>Descripción:</b> {serv.message.infoService[0].description}
            </p>

            <div className="buttons">
              <Button
                variant="outlined"
                disabled={
                  user.info[0].id_user !==
                    serv.message.infoService[0].id_user &&
                  serv.message.resolved[0].resuelto === -1
                    ? false
                    : true
                }
                startIcon={<AssignmentIcon />}
                color="warning"
                onClick={handleAcceptClick}
              >
                Aceptar Trabajo
              </Button>

              <Button
                variant="outlined"
                disabled={
                  serv.message.resolved[0].id_uReciber ===
                    user.info[0].id_user &&
                  serv.message.resolved[0].resuelto === 0
                    ? false
                    : true
                }
                startIcon={<CheckCircleOutlineIcon />}
                color="success"
                onClick={handleResolveClick}
              >
                Resolver
              </Button>

              <Button
                variant="outlined"
                disabled={
                  serv.message.infoService[0].id_user ===
                    user.info[0].id_user &&
                  (serv.message.resolved[0].resuelto === 1 ||
                    serv.message.resolved[0].resuelto === -1)
                    ? false
                    : true
                }
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleDeleteClick}
              >
                Borrar
              </Button>
            </div>
            <div className="fichs">
              <FichList fichs={serv.message.fichs} />
            </div>

            <div>
              <form className="fileAndCom">
                <div>
                  <Button
                    variant="contained"
                    component="label"
                    disabled={
                      (serv.message.resolved[0].id_uReciber ===
                        user.info[0].id_user &&
                        serv.message.resolved[0].resuelto === 0) ||
                      serv.message.infoService[0].id_user ===
                        user.info[0].id_user
                        ? false
                        : true
                    }
                  >
                    Seleccionar Archivo
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept="application/pdf"
                      disabled={
                        (serv.message.resolved[0].id_uReciber ===
                          user.info[0].id_user &&
                          serv.message.resolved[0].resuelto === 0) ||
                        serv.message.infoService[0].id_user ===
                          user.info[0].id_user
                          ? false
                          : true
                      }
                      onChange={(e) => setFile(e.target.files[0])}
                      hidden
                    ></input>
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    color="primary"
                    disabled={
                      (serv.message.resolved[0].id_uReciber ===
                        user.info[0].id_user &&
                        serv.message.resolved[0].resuelto === 0) ||
                      serv.message.infoService[0].id_user ===
                        user.info[0].id_user
                        ? false
                        : true
                    }
                    onClick={handleUploadFile}
                  >
                    Subir Archivo
                  </Button>
                </div>
                <div>
                  <TextField
                    id="comment"
                    label="Máx 150 caracteres"
                    multiline
                    rows={2}
                    variant="standard"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<ChatIcon />}
                    color="secondary"
                    onClick={handleComInput}
                  >
                    Comentar
                  </Button>
                </div>
              </form>
              <div className="comments">
                {serv.message.comentarios.length > 0 ? (
                  <ComList comms={serv.message.comentarios} />
                ) : (
                  <p>Aún no hay comentarios para este servicio</p>
                )}
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
};
