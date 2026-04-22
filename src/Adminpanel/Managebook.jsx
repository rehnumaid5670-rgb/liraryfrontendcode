import React, { useEffect, useState } from "react";
import Sidebar from "../Adminpanel/Sidebar";
import { deleteBook, getBooks, updateBook } from "../service/bookservice";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    image: "",
    available: true
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* ❌ DELETE */
  const deletebook = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    try {
      await deleteBook(id);
      fetchBooks();
    } catch (err) {
      console.error(err);
    }
  };

  /* ✏️ START EDIT */
  const handleEdit = (book) => {
    setEditId(book._id);
    setEditData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      quantity: book.quantity || 0,
      image: book.image || "",
      available: book.available
    });
  };

  /* ✏️ HANDLE CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]:
        name === "available"
          ? value === "true"
          : value
    });
  };

  /* 💾 SAVE UPDATE */
  const handleSave = async (id) => {
    try {
      await updateBook(id, editData);
      setEditId(null);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div style={layout}>
      <Sidebar />

      <div style={content}>
        <h2>📚 Manage Books</h2>

        <div style={card}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table style={table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {books.map((b) => (
                  <tr key={b._id}>
                    
                    {/* TITLE */}
                    <td>
                      {editId === b._id ? (
                        <input
                          name="title"
                          value={editData.title}
                          onChange={handleChange}
                        />
                      ) : (
                        b.title
                      )}
                    </td>

                    {/* AUTHOR */}
                    <td>
                      {editId === b._id ? (
                        <input
                          name="author"
                          value={editData.author}
                          onChange={handleChange}
                        />
                      ) : (
                        b.author
                      )}
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {editId === b._id ? (
                        <input
                          name="category"
                          value={editData.category}
                          onChange={handleChange}
                        />
                      ) : (
                        b.category
                      )}
                    </td>

                    {/* QUANTITY */}
                    <td>
                      {editId === b._id ? (
                        <input
                          type="number"
                          name="quantity"
                          value={editData.quantity}
                          onChange={handleChange}
                        />
                      ) : (
                        b.quantity
                      )}
                    </td>

                    {/* AVAILABLE */}
                    <td>
                      {editId === b._id ? (
                        <select
                          name="available"
                          value={editData.available}
                          onChange={handleChange}
                        >
                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      ) : (
                        b.available ? "Yes" : "No"
                      )}
                    </td>

                    {/* IMAGE */}
                    <td>
                      {editId === b._id ? (
                        <input
                          name="image"
                          value={editData.image}
                          onChange={handleChange}
                          placeholder="Image URL"
                        />
                      ) : (
                        <img
                          src={b.image || "https://via.placeholder.com/50"}
                          alt="book"
                          width="40"
                        />
                      )}
                    </td>

                    {/* ACTION */}
                    <td>
                      {editId === b._id ? (
                        <>
                          <button
                            style={btnSave}
                            onClick={() => handleSave(b._id)}
                          >
                            Save
                          </button>

                          <button
                            style={btnCancel}
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={btnEdit}
                            onClick={() => handleEdit(b)}
                          >
                            Edit
                          </button>

                          <button
                            style={btnDelete}
                            onClick={() => deletebook(b._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const layout = {
  display: "flex"
};

const content = {
  flex: 1,
  padding: "20px"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const btnEdit = {
  background: "#457b9d",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  marginRight: "5px"
};

const btnDelete = {
  background: "#e63946",
  color: "#fff",
  border: "none",
  padding: "5px 8px"
};

const btnSave = {
  background: "#2a9d8f",
  color: "#fff",
  border: "none",
  padding: "5px 8px",
  marginRight: "5px"
};

const btnCancel = {
  background: "#999",
  color: "#fff",
  border: "none",
  padding: "5px 8px"
};

export default ManageBooks;