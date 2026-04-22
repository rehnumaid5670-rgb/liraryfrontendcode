import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Books from "./components/Books";
import Footer from "./components/Footer";
import "./index.css";
import Feedback from "./Adminpanel/Feedbackr";
import Layout from "./Adminpanel/Layout";
import ManageBook from "./Adminpanel/Managebook";
import ManageUser from "./Adminpanel/ManageUser";
// import ReturnBook from "./Adminpanel/Return";
import AddBook from "./Adminpanel/Addbook";
import Dashboard from "./Adminpanel/Dashboard";
import Locations from "./components/Location";
import Catalogue from "./components/catalogue";
import Login from "./components/Login";
import Home from "./components/Home";
import AboutUs from "./components/Aboutus";
import Bookcard from "./components/Bookcard";
import HelpSupport from "./components/Help&support";
import Getcard from "./components/Getcard";
import News from "./components/News";
import AdminLogin from "./Adminpanel/AdminLogin";
import Ebook from "./components/Ebook";
import Register from "./components/Register";
import Using from "./components/Using";
import Space from "./components/Space";
import Course from "./components/course";
import UserFeedback from "./components/Feedback";
import LogoutButton from "./components/Logout";
// import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Header />
      {/* <Navbar/> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/admin" element={<Layout />} /> */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/adminpanel/dashboard" element={<Dashboard />} />
        {/* <Route path="/adminpanel/dashboard" element={<Dashboard />} /> */}
        <Route path="/adminpanel/managebook" element={<ManageBook />} />
        <Route path="/adminpanel/add-book" element={<AddBook />} />
        {/* <Route path="/adminpanel/return-book" element={<ReturnBook />} /> */}
        <Route path="/adminpanel/manageuser" element={<ManageUser />} />
        <Route path="/adminpanel/feedback" element={<Feedback />} />
        <Route path="/location" element={<Locations />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/about" element={<AboutUs />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/bookcard" element={<Bookcard />} />
        <Route path="/help&support" element={<HelpSupport />} />
        <Route path="/getcard" element={<Getcard />} />
        <Route path="/news" element={<News />} />
        <Route path="/ebook" element={<Ebook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/using" element={<Using />} />
        <Route path="/space" element={<Space />} />
        <Route path="/course" element={<Course />} />
        <Route path="/userfeedback" element={<UserFeedback />} />
        <Route path="/logoutbutton" element={<LogoutButton />} />
      </Routes>






      <Footer />
    </>
  );
}

export default App;