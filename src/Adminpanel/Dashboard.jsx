import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Adminpanel/Sidebar";
import { Link } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 37,
    totalUsers: 15,
    availableBooks: 35,
  });
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("https://thisisfinalrepoofbackend.vercel.app/");
      setStats(res.data);
      setCount(res.data.count);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Use lineData for the Line chart
  const lineData = {
    labels: ["Books", "Users"],
    datasets: [
      {
        label: "Count",
        data: [stats.totalBooks, stats.totalUsers],
        borderColor: "#2a9d8f",
        backgroundColor: "rgba(42,157,143,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Issued", "Available"],
    datasets: [
      {
        data: [stats.issuedBooks, stats.availableBooks],
        backgroundColor: ["#e63946", "#2a9d8f"],
      },
    ],
  };

  return (
    <div style={layout}>
      <Sidebar />
      <div style={content}>
        <h2 style={{ marginBottom: "20px" }}>📊 Admin Dashboard</h2>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* Summary Cards */}
            <div style={summaryContainer}>
              <Link to="/adminpanel/managebook" style={linkCard}>
                <div style={{ ...card, backgroundColor: "#ad620b" }}>
                  📚 <br />
                  <span style={cardNumber}>{stats.totalBooks + count}</span> Books
                </div>
              </Link>
              <Link to="/adminpanel/manageuser" style={linkCard}>
                <div style={{ ...card, backgroundColor: "#ad620b" }}>
                  👤 <br />
                  <span style={cardNumber}>{stats.totalUsers}</span> Users
                </div>
              </Link>
              <div style={{ ...card, backgroundColor: "#e63946" }}>
                🔄 <br />
                <span style={cardNumber}>{stats.issuedBooks}</span> Issued
              </div>
              <div style={{ ...card, backgroundColor: "#2a9d8f" }}>
                ✅ <br />
                <span style={cardNumber}>{stats.availableBooks}</span> Available
              </div>
            </div>

            {/* Charts */}
            <div style={chartContainer}>
              <div style={chartBox}>
                <h3>📊 Books & Users</h3>
                <Line data={lineData} options={{ responsive: true }} />
              </div>

              <div style={chartBox}>
                <h3>🍩 Issued & Available</h3>
                <Doughnut data={doughnutData} options={{ responsive: true }} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const layout = {
  display: "flex",
  minHeight: "100vh",
  background: "#f5f6fa",
};

const content = {
  flex: 1,
  padding: "20px",
};

const summaryContainer = {
  display: "flex",
  gap: "10px",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const card = {
  padding: "10px",
  borderRadius: "10px",
  color: "#fff",
  textAlign: "center",
  fontWeight: "bold",
  flex: 1,
  minWidth: "100px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
  cursor: "default",
};

const linkCard = {
  textDecoration: "none",
  flex: 1,
  minWidth: "150px",
};

const cardNumber = {
  fontSize: "22px",
  fontWeight: "bold",
  display: "block",
  margin: "10px 0",
};

const chartContainer = {
  display: "flex",
  gap: "40px",
  flexWrap: "wrap",
};

const chartBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  flex: 1,
  minWidth: "100px", // ✅ Fixed typo


};

export default AdminDashboard;