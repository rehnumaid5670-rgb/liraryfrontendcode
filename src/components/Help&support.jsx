import React, { useState } from "react";


function HelpSupport() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to support.");
    console.log(form);

    setForm({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div>

    
      <div className="help-container">

        <h1>Help & Support</h1>

        <h3>Library Support Information</h3>

        <p><b>Email:</b> librarysupport@gmail.com</p>
        <p><b>Phone:</b> +91 9876543210</p>
        <p><b>Working Hours:</b> Monday – Saturday (9:00 AM – 6:00 PM)</p>

        <h3>Frequently Asked Questions</h3>

        <ul>
          <li>How to search books in the library catalogue?</li>
          <li>How to reset my password?</li>
          <li>How to access digital books?</li>
        </ul>

        <h3>Contact Support</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>

        </form>

      </div>

    </div>
  );
}

export default HelpSupport;