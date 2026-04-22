import React, {useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });
  
 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://thisisfinalrepoofbackend.vercel.app/api/adminpanel/login", data);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin"); // redirect to dashboard
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      alert("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/adminpanel/dashboard");
    }
  }, [navigate]);

  return (
    <div className="auth-container">

      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default AdminLogin;