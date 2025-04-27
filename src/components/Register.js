import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+91");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Indian number validation
  const isValidIndianPhoneNumber = (number) => {
    const regex = /^\+91\d{10}$/;
    return regex.test(number);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!isValidIndianPhoneNumber(phone)) {
      setMessage("Please enter a valid Indian phone number (e.g., +919876543210)");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://reminder-backend-tviw.onrender.com/api/auth/signup",
        {
          username,
          email,
          password,
          phone,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      const resMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred.";
      setMessage(resMessage);
      console.error("Registration Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        background: "linear-gradient(135deg, #6c5ce7, #00b894)",
        fontFamily: "'Poppins', sans-serif",
        color: "#fff",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="logo.png"
          alt="Profile Logo"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "5px solid #fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            padding: "5px",
          }}
        />
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #fff",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Phone Number
          </label>
          <input
            type="text"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => {
              let input = e.target.value;
              // Auto prepend +91 if not included
              if (!input.startsWith("+91")) {
                input = "+91" + input.replace(/^\+?91?/, "");
              }
              setPhone(input);
            }}
            required
            style={{
              width: "100%",
              padding: "10px",
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
            padding: "12px",
            backgroundColor: loading ? "#ccc" : "#00b894",
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
            color: message.toLowerCase().includes("success") ? "lightgreen" : "red",
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
