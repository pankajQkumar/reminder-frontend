import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const ReminderHomePage = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    id: Date.now(), // Unique ID for each reminder
    type: "event",
    text: "",
    date: new Date(),
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsStatus, setSmsStatus] = useState("");
  const [reminderStatus, setReminderStatus] = useState("");
  const navigate = useNavigate();
  const timeouts = useRef(new Map());

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) navigate("/login");

    const savedReminders = JSON.parse(localStorage.getItem("reminders"));
    if (savedReminders) {
      setReminders(
        savedReminders.map((reminder) => ({
          ...reminder,
          date: new Date(reminder.date),
        }))
      );
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    timeouts.current.forEach((timeout) => clearTimeout(timeout));
    timeouts.current.clear();

    reminders.forEach((reminder) => {
      const delay = reminder.date - new Date();
      if (delay > 0) {
        const timeout = setTimeout(() => {
          sendSMS(reminder.text, reminder.date);
          handleDeleteReminder(reminder.id);
        }, delay);
        timeouts.current.set(reminder.id, timeout);
      }
    });

    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [reminders]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleAddReminder = () => {
    if (!newReminder.text.trim()) {
      alert("Please enter a reminder text.");
      return;
    }

    const updatedReminders = [
      ...reminders,
      { ...newReminder, id: Date.now() }, // Assign unique ID
    ];
    setReminders(updatedReminders);
    setNewReminder({ type: "event", text: "", date: new Date() });
    setReminderStatus("Reminder successfully added!");
  };

  const sendSMS = async (text, date) => {
    if (phoneNumber) {
      try {
        const response = await axios.post("http://localhost:3001/send_sms", {
          to: phoneNumber,
          message: `Reminder: ${text} on ${date.toLocaleString()}`,
        });
        setSmsStatus(`SMS sent successfully! SID: ${response.data.sid}`);
      } catch (error) {
        setSmsStatus("Error sending SMS: " + error.message);
      }
    }
  };

  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));

    if (timeouts.current.has(id)) {
      clearTimeout(timeouts.current.get(id));
      timeouts.current.delete(id);
    }
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>Reminder App</h1>
        <p>Your tasks, on time, every time!</p>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <main className="main-content">
        <div className="add-reminder-section">
          <select
            value={newReminder.type}
            onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
            className="reminder-type-select"
          >
            <option value="event">Event</option>
            <option value="birth">Birthday</option>
            <option value="career">CareerNaksha</option>
          </select>

          <input
            type="text"
            placeholder="Enter reminder..."
            value={newReminder.text}
            onChange={(e) => setNewReminder({ ...newReminder, text: e.target.value })}
            className="reminder-input"
          />

          <DatePicker
            selected={newReminder.date}
            onChange={(date) => setNewReminder({ ...newReminder, date })}
            dateFormat="MMMM d, yyyy h:mm aa"
            showTimeSelect
            timeIntervals={1}
            timeFormat="HH:mm"
            className="date-picker"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <input
            type="text"
            placeholder="Enter phone number (e.g., +1234567890)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-input"
          />

          <button onClick={handleAddReminder} className="add-reminder-button">
            + Add Reminder
          </button>
          {reminderStatus && <p className="reminder-status">{reminderStatus}</p>}
        </div>

        {/* Display reminders dynamically */}
        <div className="footer">
          <div className="footer-cards">
            {reminders.length === 0 ? (
              <p>No reminders yet. Start by adding a new one!</p>
            ) : (
              reminders.map((reminder) => (
                <div key={reminder.id} className="footer-card">
                  <h3>{reminder.type === "birth" ? "Birthday" : "Event"}</h3>
                  <p>{reminder.text}</p>
                  <p>{reminder.date.toLocaleString()}</p>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="delete-reminder-button"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReminderHomePage;
