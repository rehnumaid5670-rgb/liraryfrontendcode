import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  /* 🔍 SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      localStorage.setItem("searchText", searchTerm);
      navigate("/bookcard");
    }
  };

  /* 🚪 LOGOUT */
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("searchText");
      navigate("/login");
    }
  };

  const isLoggedIn = localStorage.getItem("token");

  return (
    <section className="hero">

      {/* 🔍 SEARCH BOX */}
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search library..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* 📌 TOP REQUESTS */}
      <div className="top-requests">
        <h3>Top Requests</h3>

        <ul>
          <li><Link to="/login">Account Login</Link></li>
          <li><Link to="/getcard">Get a Library Card</Link></li>
          <li><Link to="/userfeedback">Feedback</Link></li>
          <li><Link to="/space">Book or Rent Space</Link></li>
          <li><Link to="/course">Online Courses</Link></li>

          {/* 🚪 LOGOUT (ONLY IF LOGGED IN) */}
          {isLoggedIn && (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: " #7c4905",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

    </section>
  );
};

export default Hero;