// import React, { useState } from "react";
// import axios from "axios";

// function LibraryCard() {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     idproof: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

// // await axios.post("http://localhost:5000/api/library/apply-card",formData);

// // alert("Application submitted");

//     try {

//       const response = await axios.post(
//         "http://localhost:5000/api/card/apply-card",
//         formData
//       );

//       alert(response.data.message);

//       console.log("API Response:", response.data);

//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         idproof: ""
//       });

//     }
//     catch (error) {
//       console.error(error);
//       alert("Error submitting form");
//     }
//   };

//   return (
//     <div className="card-container">

//       <h2>Get a Library Card</h2>

//       <form onSubmit={handleSubmit}>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="idproof"
//           placeholder="ID Proof (Aadhar / Student ID)"
//           value={formData.idproof}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit">Apply for Library Card</button>

//       </form>

//     </div>
//   );
// }

// export default LibraryCard;
import React, { useState } from "react";
import axios from "axios";

function LibraryCard() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    idproof: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        "https://thisisfinalrepoofbackend.vercel.app/",
        formData
      );

      alert(
        `Application submitted!\nYour Library Card Number: ${response.data.cardNumber}`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        idproof: ""
      });

    } catch (error) {

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Error submitting form");
      }

      
    }

    setLoading(false);
  };

  return (
    <div className="card-container">

      <h2>Get a Library Card</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="idproof"
          placeholder="ID Proof (Aadhar / Student ID)"
          value={formData.idproof}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {loading ? "Submitting..." : "Apply for Library Card"}
        </button>

      </form>

    </div>
  );
}

export default LibraryCard;