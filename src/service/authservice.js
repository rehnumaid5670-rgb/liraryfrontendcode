import api from "./api.js";

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
// export const registerUser = async (userData) => {
//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/register", userData);
//     return res.data;
//   } catch (error) {
//     throw error.response.data;
//   }}