import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "../services/auth.service";
import ReminderHomePage from "./ReminderHomePage";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  // Define routes where the navbar should not be visible
  const hideNavbarRoutes = ["/"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {/* Conditionally render the navbar */}
      {!shouldHideNavbar && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <span to={"/"} className="navbar-brand">
            Reminder
          </span>
          <div className="navbar-nav ml-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logOut}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<ReminderHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
