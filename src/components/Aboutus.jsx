import React from "react";

function About() {
  return (
    <div className="about-section">

      <div className="about-container">

        <h1 className="about-title">About Our Library</h1>

        <p className="about-description">
          The Library Management System is a modern digital platform designed 
          to simplify access to books, academic resources, and research materials. 
          It enables students, educators, and readers to explore, search, and 
          utilize library services anytime and anywhere.
        </p>

        {/* Mission */}
        <div className="about-block">
          <h2>Our Mission</h2>
          <p>
            Our mission is to foster a culture of reading, learning, and innovation 
            by providing seamless access to a diverse collection of books and 
            digital resources. We aim to support academic growth and lifelong learning.
          </p>
        </div>

        {/* Vision */}
        <div className="about-block">
          <h2>Our Vision</h2>
          <p>
            To become a leading digital library platform that empowers users 
            with knowledge, enhances research capabilities, and promotes 
            intellectual development in the digital age.
          </p>
        </div>

        {/* Services */}
        <div className="about-block">
          <h2>Our Services</h2>
          <ul className="about-list">
            <li>📚 Comprehensive Online Book Catalogue</li>
            <li>🔍 Advanced Book Search Functionality</li>
            <li>💻 Digital Reading and E-Learning Resources</li>
            <li>📍 Library Locations and Accessibility Information</li>
            <li>👤 User Account and Borrowing Management</li>
          </ul>
        </div>

        {/* Footer note */}
        <p className="about-footer">
          We are committed to delivering a user-friendly and efficient library 
          experience that bridges the gap between traditional and digital learning.
        </p>

      </div>

    </div>
  );
}

export default About;