import React, { useState, useEffect } from "react";
import axios from "axios";

function Catalogue() {

  // ✅ FIXED state
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("https://thisisfinalrepoofbackend.vercel.app/api/media");

      // ✅ only ebooks
      const books = res.data.filter(item => item.type === "ebook");

      setBooksData(books);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // ✅ fast loading stop
    }
  };

  // ✅ search filter
  const filteredBooks = booksData.filter((book) =>
    book.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="catalogue-container">

        <h1>Library Catalogue</h1>

        {/* Search (optional enable) */}
        {/* 
        <div className="catalogue-search">
          <input
            type="text"
            placeholder="Search books..."
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div> 
        */}

        {/* ✅ FAST LOADING UI */}
        {loading ? (
          <p style={{textAlign:"center"}}>Loading books...</p>
        ) : (

          <div className="catalogue-grid">

            {filteredBooks.map((book) => (
              <div className="catalogue-card" key={book._id}>

                <img 
                  src={book.image || "https://via.placeholder.com/200"} 
                  alt={book.title}
                />

                <h3>{book.title}</h3>

                <p>{book.author}</p>

                <span className="category">
                  {book.category || "General"}
                </span>

                {/* ✅ VIEW BOOK WORKING */}
                <a 
                  href={book.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <button>View Book</button>
                </a>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Catalogue;