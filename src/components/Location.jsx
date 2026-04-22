import React from "react";


function Locations() {
  const locations = [
    {
      name: " Central Library",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Library_icon.svg",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.1234567890!2d77.4100!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6ef43c6a1eab%3A0x1234567890abcdef!2sBhopal%20Central%20Library!5e0!3m2!1sen!2sin!4v1671234567890!5m2!1sen!2sin"
    },
    // {
    //   name: "City Knowledge Center",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Knowledge_icon.svg",
    //   mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.1234567890!2d77.4100!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6ef43c6a1eab%3A0xabcdef1234567890!2sCity%20Knowledge%20Center!5e0!3m2!1sen!2sin!4v1671234567890!5m2!1sen!2sin"
    // },
    // {
    //   name: "Digital Study Hub",
    //   image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Study_icon.svg",
    //   mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.1234567890!2d77.4100!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c6ef43c6a1eab%3A0xabcdef1234567890!2sDigital%20Study%20Hub!5e0!3m2!1sen!2sin!4v1671234567890!5m2!1sen!2sin"
    // }
  ];

  return (
    <div className="locations-container">
      <h2>Library Locations</h2>

      <div className="locations-grid">
        {locations.map((loc, index) => (
          <div key={index} className="location-card">
            <h3>{loc.name}</h3>
            <img src={loc.image} alt={loc.name} className="location-image"/>
            <iframe
              src={loc.mapEmbed}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title={loc.name}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Locations;