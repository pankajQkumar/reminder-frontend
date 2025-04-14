import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router's navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages
    setLoading(true); // Start loading

    try {
      // Sending the request to the backend to log in the user
      const response = await axios.post("http://localhost:3001/api/auth/signin", {
        email,
        password,
      });

      // Store the JWT token in local storage for subsequent requests
      localStorage.setItem("userToken", response.data.token);

      // Navigate to the homepage after successful login
      navigate("/");

      // Display success message
      setMessage("Login successful!");

      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // If an error occurs, display error message
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        "An error occurred.";
      setMessage(resMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="login-page"
      style={{
        maxWidth: "420px",
        margin: "80px auto",
        padding: "30px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #6c5ce7, #00b894)", // Gradient background
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="/logo.png"  // Replace this with the path to your logo
          alt="Profile Logo"
          style={{
            width: "100px",  // Adjust the size of the logo
            height: "100px",  // Adjust the size of the logo
            borderRadius: "50%",  // Optional: To make the logo circular
            border: "3px solid #fff",
            padding: "5px",
          }}
        />
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading} // Disable input fields when loading
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading} // Disable input fields when loading
            style={{
              width: "100%",
              padding: "12px",
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
            padding: "14px",
            backgroundColor: loading ? "#ccc" : "#00b894",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "18px",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "16px",
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
