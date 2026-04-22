import React, { useEffect, useState } from "react";
import axios from "axios";

function LibraryMedia() {
  const [ebooks, setEbooks] = useState([]);
  const [audiobooks, setAudiobooks] = useState([]);
  const [activeTab, setActiveTab] = useState("ebooks"); // "ebooks" or "audiobooks"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ebooksRes, audiobooksRes] = await Promise.all([
        axios.get("https://thisisfinalrepoofbackend.vercel.app/"),
        axios.get("https://thisisfinalrepoofbackend.vercel.app/"),
      ]);
      setEbooks(ebooksRes.data);
      setAudiobooks(audiobooksRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/${type}/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const renderCards = (items, type) => {
    if (items.length === 0) {
      return <p style={{ textAlign: "center", padding: "20px" }}>No {type === "ebooks" ? "ebooks" : "audiobooks"} available</p>;
    }

    return (
      <div style={cardsContainer}>
        {items.map((item) => (
          <div key={item._id} style={card}>
            <img
              src={item.image || "https://via.placeholder.com/150x200"}
              alt={item.title}
              style={cardImage}
            />
            <div style={cardBody}>
              <h3>{item.title}</h3>
              <p>{item.author}</p>
              <span style={item.status === "available" ? badgeGreen : badgeRed}>
                {item.status}
              </span>
              <div style={cardButtons}>
                {type === "ebooks" ? (
                  <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" style={actionBtn}>
                    📥 Download
                  </a>
                ) : (
                  <a href={item.audioUrl} target="_blank" rel="noopener noreferrer" style={actionBtn}>
                    ▶️ Listen
                  </a>
                )}
                <button style={deleteBtn} onClick={() => deleteItem(item._id, type)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={layout}>
      <div style={content}>
        <h2>📚 Library Media</h2>

        {/* Tabs */}
        <div style={tabs}>
          <button style={activeTab === "ebooks" ? activeTabStyle : tabStyle} onClick={() => setActiveTab("ebooks")}>Ebooks</button>
          <button style={activeTab === "audiobooks" ? activeTabStyle : tabStyle} onClick={() => setActiveTab("audiobooks")}>Audiobooks</button>
        </div>

        {/* Cards */}
        {loading ? <p>Loading {activeTab}...</p> : renderCards(activeTab === "ebooks" ? ebooks : audiobooks, activeTab)}
      </div>
    </div>
  );
}

/* Styles */
const layout = { display: "flex", minHeight: "100vh", background: "#f5f6fa" };
const content = { flex: 1, padding: "40px" };
const tabs = { display: "flex", gap: "10px", marginBottom: "20px" };
const tabStyle = { padding: "10px 20px", border: "1px solid #ccc", borderRadius: "5px", background: "#fff", cursor: "pointer" };
const activeTabStyle = { ...tabStyle, background: "#2a9d8f", color: "#fff", border: "1px solid #2a9d8f" };

const cardsContainer = { display: "flex", flexWrap: "wrap", gap: "20px" };
const card = { width: "200px", background: "#fff", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", overflow: "hidden" };
const cardImage = { width: "100%", height: "250px", objectFit: "cover" };
const cardBody = { padding: "15px" };
const cardButtons = { display: "flex", justifyContent: "space-between", marginTop: "10px" };
const actionBtn = { textDecoration: "none", background: "#2a9d8f", color: "#fff", padding: "5px 10px", borderRadius: "5px", fontSize: "12px" };
const deleteBtn = { background: "#e63946", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", fontSize: "12px" };

const badgeGreen = { background: "#d4edda", color: "#155724", padding: "4px 8px", borderRadius: "20px", fontSize: "12px", marginTop: "5px", display: "inline-block" };
const badgeRed = { background: "#f8d7da", color: "#721c24", padding: "4px 8px", borderRadius: "20px", fontSize: "12px", marginTop: "5px", display: "inline-block" };

export default LibraryMedia;