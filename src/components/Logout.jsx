import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove stored user data
    localStorage.removeItem("user");

    // Optional: clear everything
    // localStorage.clear();

    // Redirect to Home Page
    navigate("/");

  };

  return (
    <button onClick={handleLogout} style={btn}>
      Logout
    </button>
  );
}

const btn = {
  padding: "8px 15px",
  background: "#e63946",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default LogoutButton;