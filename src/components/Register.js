import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    setLoading(true); // Start loading

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setMessage("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Sending the request to the backend to register the user
      const response = await axios.post("http://localhost:3001/api/auth/signup", {
        username,
        email,
        password,
        phone,
      });
      setMessage(response.data.message); // Display success message
    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || "An error occurred.";
      setMessage(resMessage);
      console.error("Registration Error: ", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="register-page"
      style={{
        maxWidth: "400px", // Smaller max width
        margin: "60px auto", // Adjusted margin
        padding: "20px", // Reduced padding
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #6c5ce7, #00b894)", // Gradient background
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="logo.png"  // Replace this with the path to your logo
          alt="Profile Logo"
          style={{
            width: "80px",  // Smaller logo size
            height: "80px",
            borderRadius: "50%",
            border: "5px solid #fff", // White border around the logo
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            padding: "5px",
          }}
        />
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px", // Smaller input padding
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px", // Smaller input padding
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px", // Smaller input padding
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px", // Smaller input padding
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px", // Slightly smaller button
            backgroundColor: loading ? "#ccc" : "#00b894", // Gradient-like button color
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "18px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "16px",
            color: message.includes("success") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};
export default Register;
