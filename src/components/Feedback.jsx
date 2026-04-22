import React, { useState } from "react";
import axios from "axios";

function UserFeedback() {

  const [form, setForm] = useState({
    name: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.message) {
      setMsg("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("https://thisisfinalrepoofbackend.vercel.app/api/feedback", form);

      setMsg("✅ Feedback submitted successfully!");

      setForm({
        name: "",
        message: ""
      });

    } catch (error) {
      setMsg("❌ Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      <h2 style={title}>💬 Give Your Feedback</h2>

      {msg && <p style={message}>{msg}</p>}

      <form onSubmit={handleSubmit} style={formStyle}>

        <div style={formGroup}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div style={formGroup}>
          <label>Your Feedback</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your feedback..."
          />
        </div>

        <button style={btn} disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </form>

    </div>
  );
}

/* 🎨 Styles */

const container = {
  maxWidth: "500px",
  margin: "60px auto",
  padding: "30px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  textAlign: "center"
};

const title = {
  marginBottom: "20px"
};

const message = {
  marginBottom: "15px",
  fontWeight: "bold"
};

const formStyle = {
  display: "flex",
  flexDirection: "column"
};

const formGroup = {
  marginBottom: "15px",
  display: "flex",
  flexDirection: "column",
  textAlign: "left"
};

const btn = {
  padding: "12px",
  background: "#ce730c",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default UserFeedback;