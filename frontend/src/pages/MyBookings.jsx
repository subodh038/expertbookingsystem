import React, { useState } from "react";
import API from "../services/api";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await API.get(`/bookings?email=${email}`);
      setBookings(res.data);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>My Bookings</h1>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <button onClick={fetchBookings} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.map((booking) => (
        <div key={booking._id} className="card">
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.timeSlot}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;