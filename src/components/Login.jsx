import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [login, setLogin] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setLogin({...login,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 NEW: call backend login API
      const res = await axios.post(
        "https://thisisfinalrepoofbackend-tk1u.vercel.app/api/auth/login",
        login
      );

      // 🔥 NEW: store token
      localStorage.setItem("token", res.data.token);

      // 🔥 NEW: store logged-in user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 NEW: send login data for admin tracking
      await axios.post(
        "https://thisisfinalrepoofbackend-tk1u.vercel.app/api/adminpanel/login-data",
        {
          email: login.email,
          time: new Date()
        }
      );

      alert("Login Successful");
      window.location.href = "/";

    } catch (err) {

      // fallback to old localStorage check (optional)
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if(
        savedUser &&
        login.email === savedUser.email &&
        login.password === savedUser.password
      ){
        alert("Login Successful (Local)");
        window.location.href = "/";
      }
      else{
        alert(err.response?.data?.message || "Invalid Email or Password");
      }
    }
  };

  return (
    <div className="auth-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;