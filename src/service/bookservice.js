import api from "./api"; // axios instance

// Get all books
export const getBooks = () => api.get("/books");

// Get book by ID
export const getBookById = (id) => api.get(`/books/${id}`);

// Add a new book
export const addBook = (bookData) => api.post("/books/", bookData);

// Update book
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData);

// Delete book
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const getFeedbacks = () => api.get("/feedback");