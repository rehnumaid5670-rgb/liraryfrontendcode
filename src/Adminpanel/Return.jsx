// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../adminpanel/sidebar";

// function ReturnBook() {

//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchIssued();
//   }, []);

//   const fetchIssued = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/books/issued");
//       setBooks(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReturn = async (id) => {
//     if (!window.confirm("Mark this book as returned?")) return;

//     try {
//       await axios.put(`http://localhost:5000/api/books/return/${id}`);
//       fetchIssued();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={layout}>
//       <Sidebar />

//       <div style={content}>

//         <h2 style={{ marginBottom: "20px" }}>🔄 Return Books</h2>

//         <div style={card}>

//           {loading ? (
//             <p>Loading issued books...</p>
//           ) : books.length === 0 ? (
//             <p>No issued books</p>
//           ) : (
//             <table style={table}>

//               <thead>
//                 <tr style={thead}>
//                   <th>Book Title</th>
//                   <th align="center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {books.map((b) => (
//                   <tr key={b._id} style={row}>

//                     <td>{b.title}</td>

//                     <td align="center">
//                       <button
//                         style={btnReturn}
//                         onClick={() => handleReturn(b._id)}
//                       >
//                         Return
//                       </button>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// /* 🎨 Styles */

// const layout = {
//   display: "flex",
//   background: "#f5f6fa",
//   minHeight: "100vh"
// };

// const content = {
//   flex: 1,
//   padding: "40px"
// };

// const card = {
//   background: "#fff",
//   padding: "25px",
//   borderRadius: "10px",
//   boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse"
// };

// const thead = {
//   background: "#f1f2f6",
//   textAlign: "left"
// };

// const row = {
//   borderBottom: "1px solid #eee"
// };

// const btnReturn = {
//   background: "#2a9d8f",
//   color: "#fff",
//   border: "none",
//   padding: "6px 12px",
//   borderRadius: "5px",
//   cursor: "pointer",
//   fontWeight: "bold"
// };

// export default ReturnBook;