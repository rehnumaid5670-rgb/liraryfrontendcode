import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <h1>📚 𝐓𝐡𝐞 𝐋𝐢𝐛𝐫𝐚𝐫𝐲</h1>
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/bookcard">Books</Link>
        {/* <a href="#">Using the Library</a> */}

        <Link to="/help&support">Help & Support</Link>
        {/* <Link to="/userfeedback">Feedback <userfeedback/> </Link> */}
      </nav>
    </header>
  );
};

export default Header;