import React, { useEffect, useState } from "react";
import { getBooks } from "../service/bookservice";

const Books = () => {
  const [books, setBooks] = useState([]);       // store API books
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState("");       // error state

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getBooks(); // call API
        console.log(res.data.data);
        // ✅ Extract the "data" array from API response
        if (res && res.data.success && Array.isArray(res.data.data)) {
          setBooks(res.data.data || []); // <-- FIX HERE
        } else {
          setBooks([]);
          setError("No books found");
        }
      } catch (err) {
        console.error("Failed to fetch books:", err.message);
        setError("Unable to load books.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
  
  <section className="books">
      <h2>Top Book Collections</h2>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="book-grid">
        {books.map((book) => (
          <div className="book" key={book._id}>
            <a
              href={`https://openlibrary.org/search?q=${encodeURIComponent(book.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
  src={book.image ? book.image : "https://via.placeholder.com/150"}
  alt={book.title}
/>
            </a>
            <p>{book.title}</p>
            <p style={{ fontSize: "0.8rem", color: "#555" }}>
              {book.author || "Unknown Author"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Books;