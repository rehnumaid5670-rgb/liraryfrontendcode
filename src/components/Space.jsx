import React, { useEffect, useState } from "react";
import axios from "axios";

function SpaceBooking() {
  const [bookings, setBookings] = useState([]);
  const [spaceName, setSpaceName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch bookings from API
  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/space/my-bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(Array.isArray(res.data) ? res.data : res.data.bookings || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Book a space
  const handleBook = async () => {
    if (!spaceName || !date || !startTime || !endTime) {
      setMessage("Please complete all fields");
      return;
    }

    setMessage("");
    try {
      const res = await axios.post(
        "https://thisisfinalrepoofbackend.vercel.app/",
        { spaceName, date, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      fetchBookings();
      setSpaceName(""); setDate(""); setStartTime(""); setEndTime("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error booking space");
    }
  };

  // Cancel booking
  const handleCancel = async (id) => {
    try {
      const res = await axios.post(
        "/api/space/cancel-booking",
        { bookingId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      fetchBookings();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error cancelling booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="space-booking-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>📌 Library Space Booking</h2>

      {/* Booking Form */}
      <div className="booking-form" style={{ display: "grid", gap: "0.5rem", marginBottom: "1rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
        <input
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          placeholder="Space Name"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
        />
        <input
          style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            style={{ flex: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <button
          onClick={handleBook}
          style={{ padding: "0.5rem", borderRadius: "4px", background: "#4CAF50", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Book Space
        </button>
      </div>

      {/* Feedback Messages */}
      {message && <p style={{ color: "#2E7D32", fontWeight: "bold" }}>{message}</p>}
      {error && <p style={{ color: "#D32F2F", fontWeight: "bold" }}>{error}</p>}

      {/* Loading State */}
      {loading && <p>Loading bookings...</p>}

      {/* Bookings List */}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && bookings.length > 0 && (
        <div className="bookings-list" style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          {bookings.map((b) => (
            <div
              key={b._id}
              className="booking-card"
              style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}
            >
              <div>
                <p><strong>{b.spaceName}</strong></p>
                <p>{new Date(b.date).toLocaleDateString()}</p>
                <p>{b.startTime} - {b.endTime}</p>
                <p>Status: <span style={{ color: b.status === "Booked" ? "#2E7D32" : "#D32F2F" }}>{b.status}</span></p>
              </div>
              {b.status === "Booked" && (
                <button
                  onClick={() => handleCancel(b._id)}
                  style={{ padding: "0.5rem 1rem", borderRadius: "4px", background: "#f44336", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpaceBooking;