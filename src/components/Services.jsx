import React from "react";
import { Link } from "react-router-dom";
const Services = () => {
  return (
    <section className="services">
      <div className="card"> <Link to="location"> 📍 Locations </Link></div>
          <div className="card"> <Link to="eBook">📚 eBooks, Audiobookss </Link></div>
      {/* <div className="card">📚 eBooks, Audiobooks</div> */}
      <div className="card"> <Link to="news"> 📰 Newspapers & Magazines</Link></div>
        <div className="card"> <Link to="using">ℹ Using the Library</Link></div>
      {/* <div className="card">ℹ Using the Library</div> */}
      {/* <div className="card">🔍 Research and Learn</div>
      <div className="card">📅 Process of issuing</div> */}
    </section>
  );
};

export default Services;