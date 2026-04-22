import React, { useEffect, useState } from "react";
import axios from "axios";

function UsingLibrary() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getLibraryData();
  }, []);

  const getLibraryData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://thisisfinalrepoofbackend.vercel.app/api/library/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      setIssuedBooks(data?.books || []);
      setCard(data?.card || null);
      setError("");
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load library data");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Loading State
  if (loading) {
    return (
      <div className="library-section">
        <h3>Loading library data...</h3>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="library-section">
        <h3 style={{ color: "red" }}>{error}</h3>
      </div>
    );
  }

  return (
    <div className="library-section">
      <h2>📚 Using the Library</h2>

      {/* 📇 Library Card */}
      <div className="card-box">
        <h3>Library Card Details</h3>

        <p><strong>Name:</strong> {card?.name || "N/A"}</p>
        <p><strong>Card ID:</strong> {card?.cardId || "N/A"}</p>
        <p><strong>Membership:</strong> {card?.type || "Student"}</p>
        <p><strong>Email:</strong> {card?.email || "N/A"}</p>

        <hr />

        <p><strong>Issue Date:</strong> {card?.issueDate || "N/A"}</p>
        <p><strong>Expiry Date:</strong> {card?.expiryDate || "N/A"}</p>
        <p><strong>Status:</strong> {card?.status || "Active"}</p>

        <hr />

        <p><strong>Books Issued:</strong> {issuedBooks.length}</p>
        <p><strong>Limit:</strong> 5 Books</p>
        <p><strong>Available:</strong> {5 - issuedBooks.length}</p>

        <hr />

        <p><strong>Pending Fine:</strong> ₹{card?.fine || 0}</p>
      </div>

      {/* 📚 Issued Books */}
      <div className="books-box">
        <h3>Issued Books</h3>

        {issuedBooks.length === 0 ? (
          <p>No books currently issued.</p>
        ) : (
          <div className="books-list">
            {issuedBooks.map((book, index) => (
              <div key={index} className="book-card">
                <h4>{book?.title || "Untitled"}</h4>
                <p><strong>Author:</strong> {book?.author || "Unknown"}</p>
                <p><strong>Due Date:</strong> {book?.dueDate || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UsingLibrary;