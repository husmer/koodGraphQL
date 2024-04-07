import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenInfo = JSON.parse(localStorage.getItem("token"));
    const currentTime = new Date().getTime();
    if (!tokenInfo || currentTime > tokenInfo.expiration) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload();
    }
  }, [navigate]);

  return <Outlet />;
}

export default ProtectedRoute;