import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Redux/Thunk";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import Swal from "sweetalert2";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.User || {});

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(username, email, Password, "user"));
    };

    useEffect(() => {
        if (user) {
            alert("Account created successfully!");
            navigate("/dashboard");
        } else if (error) {
            Swal.fire({
                icon: "error",
                title: "invalid-email OR password",
                text: error,
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }, [user, error, navigate]);

    return (
        <div>
            <header className="header">
                <h1>Job Applications</h1>
                <button onClick={() => {
                    navigate("/")
                }}>Login</button>
            </header>
            <form onSubmit={handleRegister} className="formCon">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    autoComplete="email"
                />
                <input
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    autoComplete="current-password"
                />
                <button type="submit">Register</button>
            </form>
            <footer className="footer">
                HUSSAM 2025
            </footer>
        </div>
    );
}