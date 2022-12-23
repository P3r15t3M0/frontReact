import { useContext, useState } from "react";
import { logUserService } from "../services";
import { AuthContext } from "../contex/AuthContext";
import { useNavigate } from "react-router-dom";

export const LogPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await logUserService({ email, password });
      login(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="centered">
      <section className="userMode">
        <h2>Login</h2>
        <form onSubmit={handleForm}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>LogIn</button>
        </form>
        {error ? <p>{error}</p> : null}
      </section>
    </main>
  );
};
