import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear storages
    localStorage.clear();
    sessionStorage.clear();
    // Redirect
    navigate("/auth/login");
    window.location.reload(); // Reload the page to ensure all components are reset
  }, [navigate]);

  return null; // You can also show a loader or message here
};

export default Logout;
