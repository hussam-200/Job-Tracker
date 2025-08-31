import { Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashbouard";
import ProfilePage from "./component/ProfilePage";
import NotFound from "./component/NotFound";
import PrivateRoute from "./PrivateNavigate";
import AdminPage from "./component/AdminPage"
import ResumeHelper from "./ResumeHelper/ResumeHelper";
import DescriptionAnalyzer from "./DescriptionAnalyzer/DescriptionAnalyzer";
import Chat from "./Chat/Chat";

export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />


      <Route
        path="/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />


      <Route
        path="/profilepage"
        element={
          <PrivateRoute allowedRoles={["user","admin"]}>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/adminpage"
        element={
          <PrivateRoute allowedRoles={["user" , "admin"]}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/resumehelper"
        element={
          <PrivateRoute allowedRoles={["user" , "admin"]}>
            <ResumeHelper />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobanalyzer"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <DescriptionAnalyzer />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute allowedRoles={["user","admin"]}>
            <Chat />
          </PrivateRoute>
        }
      />


      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
