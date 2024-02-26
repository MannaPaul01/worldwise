import { useContext, useDeferredValue, useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../Components/PageNav";
import { UserAuthContext } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(UserAuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(function () {
    if (isAuthenticated) navigate('/App', { replace: true });
  }, [isAuthenticated])


  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </main>
  );
}
