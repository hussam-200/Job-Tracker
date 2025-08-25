import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.User || {});

  // إذا لم يكن المستخدم مسجل الدخول
  if (!user) return <Navigate to="/" />;

  // إذا تم تسجيل الدخول ولكن الدور غير مسموح
  if (allowedRoles && !allowedRoles.includes(user.roll)) return <Navigate to="/dashboard" />;

  return children;
}