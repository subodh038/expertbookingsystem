import React, { useState } from "react";
import API from "../services/api";

const BookingPage = ({ expertId, selectedSlot, date }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await API.post("/bookings", {
        expertId,
        date,
        timeSlot: selectedSlot,
        ...form
      });

      setMessage("✅ Booking successful!");
      setForm({ name: "", email: "", phone: "", notes: "" });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>Book This Slot</h3>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" required value={form.name} onChange={handleChange} />

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
        />

        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingPage;