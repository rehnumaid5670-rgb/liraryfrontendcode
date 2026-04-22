import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Feedback() {

  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("https://thisisfinalrepoofbackend.vercel.app/api/feedback");
      setFeedback(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      fetchFeedback();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={layout}>
      <Sidebar />

      <div style={content}>
        <h2 style={{ marginBottom: "20px" }}>📝 User Feedback</h2>

        <div style={card}>

          {loading ? (
            <p>Loading feedback...</p>
          ) : feedback.length === 0 ? (
            <p>No feedback available</p>
          ) : (
            <table style={table}>

              <thead>
                <tr style={thead}>
                  <th>Name</th>
                  <th>Message</th>
                  <th align="center">Action</th>
                </tr>
              </thead>

              <tbody>
                {feedback.map((f) => (
                  <tr key={f._id} style={row}>

                    <td style={{ fontWeight: "bold" }}>
                      {f.name}
                    </td>

                    <td style={messageStyle}>
                      {f.message}
                    </td>

                    <td align="center">
                      <button
                        style={btnDelete}
                        onClick={() => deleteFeedback(f._id)}
                      >
                        Delete
                      </button>
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

/* 🎨 Styles */

const layout = {
  display: "flex",
  background: "#f5f6fa",
  minHeight: "100vh"
};

const content = {
  flex: 1,
  padding: "40px"
};

const card = {
  background: "#fff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const table = {
  width: "100%",
  borderCollapse: "collapse"
};

const thead = {
  background: "#f1f2f6",
  textAlign: "left"
};

const row = {
  borderBottom: "1px solid #eee"
};

const messageStyle = {
  maxWidth: "400px",
  wordWrap: "break-word",
  color: "#555"
};

const btnDelete = {
  background: "#e63946",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default Feedback;