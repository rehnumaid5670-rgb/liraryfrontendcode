import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Publications = () => {
  const [newspapers, setNewspapers] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPublications = async () => {
      setLoading(true);

      try {
        // Fetch Newspapers
        const newspaperRes = await fetch(
          "https://openlibrary.org/subjects/newspapers.json?limit=8"
        );
        const newspaperData = await newspaperRes.json();
        setNewspapers(newspaperData.works);

        // Fetch Magazines
        const magazineRes = await fetch(
          "https://openlibrary.org/subjects/magazines.json?limit=8"
        );
        const magazineData = await magazineRes.json();
        setMagazines(magazineData.works);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const renderItem = (item) => {
    const cover = item.cover_id
      ? `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
      : "https://via.placeholder.com/150";
    const link = `https://openlibrary.org${item.key}`;
    return (
      <div className="book" key={item.key}>
        <a href={link}>
          <img src={cover} alt={item.title} />
        </a>
        <p>{item.title}</p>
      </div>
    );
  };

  return (
    <section className="books">
      <h2>Newspapers</h2>
      {loading && <p>Loading...</p>}
      <div className="book-grid">
        {newspapers.map(renderItem)}
      </div>

      <h2>Magazines</h2>
      {loading && <p>Loading...</p>}
      <div className="book-grid">
        {magazines.map(renderItem)}
      </div>
    </section>
  );
};

export default Publications;