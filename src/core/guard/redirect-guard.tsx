import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/inicio");
    }
  }, [navigate]);

  return null;
};

export default RedirectGuard;
