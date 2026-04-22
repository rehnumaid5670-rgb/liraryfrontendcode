import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Adminpanel/Sidebar";
import { Link, useNavigate } from "react-router-dom";

import { addBook } from "../service/bookservice";

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    status: "available",
    image: "" // ✅ added
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      setMessage("⚠️ Title and Author are required");
      return;
    }

    try {
      setLoading(true);

      // await axios.post("http://localhost:5000/api/books", book);
      await addBook(book);

      setMessage("✅ Book added successfully!");
      navigate("/adminpanel/managebook");

      setBook({
        title: "",
        author: "",
        category: "",
        quantity: "",
        status: "available",
        image: "" // ✅ reset
      });

    } catch (err) {
      setMessage("❌ Error adding book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", background: "#f5f6fa", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px" }}>

        <h2 style={{ marginBottom: "20px" }}>➕ Add New Book</h2>

        <div style={card}>

          {message && <p style={{ marginBottom: "15px" }}>{message}</p>}

          <form onSubmit={handleSubmit}>

            <div style={formGroup}>
              <label>Book Title</label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Enter book title"
              />
            </div>

            <div style={formGroup}>
              <label>Author</label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Enter author name"
              />
            </div>

            <div style={formGroup}>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={book.category}
                onChange={handleChange}
                placeholder="e.g. Fiction, Science"
              />
            </div>

            {/* ✅ IMAGE FIELD ADDED */}
            <div style={formGroup}>
              <label>Book Image URL</label>
              <input
                type="text"
                name="image"
                value={book.image}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </div>

            {/* ✅ IMAGE PREVIEW */}
            {book.image && (
              <img
                src={book.image}
                alt="preview"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  marginBottom: "15px",
                  borderRadius: "8px"
                }}
              />
            )}

            <div style={formGroup}>
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={book.quantity}
                onChange={handleChange}
                placeholder="1"
              />
            </div>

            <div style={formGroup}>
              <label>Status</label>
              <select name="status" value={book.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="issued">Issued</option>
              </select>
            </div>

            <button style={btn} disabled={loading}>
              {loading ? "Adding..." : "Add Book"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

/* 🎨 Styles */

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  maxWidth: "500px"
};

const formGroup = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "#ce730c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default AddBook;