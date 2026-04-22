import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("title"); // title | author | subject
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * 1. INITIAL MOUNT: 
   * - Load favorites
   * - Check for redirect search from Hero section
   */
  useEffect(() => {
    // Load favorites
    const storedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFav);

    // Check for search text from Hero component
    const redirectedSearch = localStorage.getItem("searchText");
    if (redirectedSearch) {
      setSearch(redirectedSearch);
      // Clean up so it doesn't search again if user refreshes
      localStorage.removeItem("searchText");
    }
  }, []);

  /**
   * 2. AUTHENTICATION CHECK
   */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  /**
   * 3. FETCH LOGIC
   */
  const fetchBooks = async (query) => {
    if (!query || query.trim() === "") {
      setBooks([]);
      return;
    }

    setLoading(true);
    try {
      let url = "";
      if (filter === "author") {
        url = `https://openlibrary.org/search.json?author=${query}`;
      } else if (filter === "subject") {
        url = `https://openlibrary.org/search.json?subject=${query}`;
      } else {
        url = `https://openlibrary.org/search.json?title=${query}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setBooks(data?.docs?.slice(0, 12) || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 4. DEBOUNCE SEARCH
   * This triggers whenever 'search' or 'filter' changes.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, filter]);

  /**
   * FAVORITES LOGIC
   */
  const toggleFavorite = (book) => {
    const exists = favorites.find((fav) => fav.key === book.key);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.key !== book.key);
    } else {
      updatedFavorites = [...favorites, book];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (book) => {
    return favorites.some((fav) => fav.key === book.key);
  };

  return (
    <section className="books">
      <h2>Search Books</h2>

      {/* Search + Filter UI */}
      <div className="search-box2">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select  value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="title">Search by Title</option>
          <option value="author">Search by Author</option>
          <option value="subject">Search by Subject</option>
        </select>
      </div>

      {/* Loading State */}
      {loading && <p>Loading books...</p>}

      {/* Results Grid */}
      {!loading && (
        <div className="book-grid">
          {/* If there is a search term and books were found */}
          {search && books.length > 0 ? (
            books.map((book, index) => {
              const coverImage = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150";
              const bookLink = `https://openlibrary.org${book.key}`;

              return (
                <div className="book-card" key={index}>
                  <a href={bookLink} target="_blank" rel="noreferrer">
                    <img src={coverImage} alt={book.title} loading="lazy" />
                  </a>
                  <h4>{book.title}</h4>
                  <p>{book.author_name?.[0] || "Unknown Author"}</p>
                  <button className="fav-btn" onClick={() => toggleFavorite(book)}>
                    {isFavorite(book) ? "★ Remove Favorite" : "☆ Add Favorite"}
                  </button>
                </div>
              );
            })
          ) : (
            search && !loading && <p>No results found for "{search}".</p>
          )}
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* Favorites Section */}
      <div className="favorites-section">
        <h2>⭐ My Favorite Books</h2>
        {favorites.length === 0 ? (
          <p>No favorite books added.</p>
        ) : (
          <div className="book-grid">
            {favorites.map((book, index) => {
              const coverImage = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150";

              return (
                <div className="book-card" key={index}>
                  <img src={coverImage} alt={book.title} />
                  <h4>{book.title}</h4>
                  <p>{book.author_name?.[0] || "Unknown Author"}</p>
                  <button className="fav-btn" onClick={() => toggleFavorite(book)}>
                    ★ Remove Favorite
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;