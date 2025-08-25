import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/Thunk";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Swal from "sweetalert2";
import { clearError } from "../Redux/Reduser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, error } = useSelector((state) => state.User);


  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(email, password))
  };
  useEffect(() => {
    if (user) {
      if (user.roll === "admin") navigate("/dashboard");
      else navigate("/adminpage");
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "invalid-email OR password",
        text: error,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      dispatch(clearError());
    }
  }, [user, error, navigate]);

  return (
    <div className="login-container">
      <header className="header">
        <h1>Job Applications</h1>
        <button onClick={() => {
          navigate("/register")
        }}>register</button>
      </header>
      <div className="formCon">
        <form onSubmit={handleLogin} >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit">Login</button>

        </form>

      </div>

      <footer className="footer">
        HUSSAM 2025
      </footer>
    </div>
  );
}
