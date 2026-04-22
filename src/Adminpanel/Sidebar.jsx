import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Sidebar() {
 

   
  return (
    <>
    <div className="sidebar">

      <h2>Library Admin</h2>

      <ul>
       
        <li><Link to="/adminpanel/dashboard">Dashboard</Link></li>
        <li><Link to="/adminpanel/managebook">Manage Books</Link></li>
        <li><Link to="/adminpanel/add-book">Add Book</Link></li>
        {/* <li><Link to="/adminpanel/return-book">Return Book</Link></li> */}
        <li><Link to="/adminpanel/manageuser">Manage Users</Link></li>
        <li><Link to="/adminpanel/feedback">Feedback</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>

    </div>
    </>
  );
}

export default Sidebar;