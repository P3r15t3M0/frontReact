import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, registerUserService } from "../services";
import Button from "@mui/material/Button";

export const RegPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Las passwords no coinciden");
      return;
    }

    try {
      await registerUserService({ email, password: pass1 });
      //await updateUser({alias, bioText, photo, fecNac});
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="centered">
      <section className="userMode">
        <h2>Register</h2>
        <form onSubmit={handleForm}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="pass1">Password</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          />
          <label htmlFor="pass2">Repita Password</label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginTop: "1.4rem" }}
            type="submit"
          >
            Registrar
          </Button>
          {error ? <p>{error}</p> : null}
        </form>
        <br />
        <form className="form2"></form>
      </section>
    </main>
  );
};
