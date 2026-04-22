import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Adminpanel/Sidebar";

function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://thisisfinalrepoofbackend.vercel.app/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={layout}>
      <Sidebar />

      <div style={content}>
        <h2 style={{ marginBottom: "20px" }}>👤 Manage Users</h2>

        <div style={card}>

          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table style={table}>
              <thead>
                <tr style={thead}>
                  <th>Name</th>
                  <th>Email</th>
                  <th align="center">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} style={row}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td align="center">
                      <button
                        style={btnDelete}
                        onClick={() => deleteUser(u._id)}
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

/* 🎨 Professional Styles */

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

const btnDelete = {
  background: "#c97221",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "0.3s"
};

export default ManageUsers;