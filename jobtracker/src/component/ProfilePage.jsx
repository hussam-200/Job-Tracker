import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Reduser";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/FireBase";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"
import { use } from "react";
export default function ProfilePage() {
  const {user} = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/");
  };


  if (!user) return <p>Loading user info...</p>;

  console.log(user);

  return (
    <div className="profile-container">
      <header >
        <h1>Job Applications</h1>
      </header>
      <ul >
        <li>{user.username || "N/A"}</li>
        <li>{user.email}</li>
        <li>{user.uid}</li>
      </ul>
      <button onClick={handleSignOut} >Sign Out</button>
      <button
        onClick={() => {
          if ({user}?.user?.roll === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/adminpage");
          }
        }}
      >
        {user?.user?.roll === "admin" ? "Home" : "Home"}
      </button>
      <footer>
        HUSSAM 2025
      </footer>
    </div>
  );
}
