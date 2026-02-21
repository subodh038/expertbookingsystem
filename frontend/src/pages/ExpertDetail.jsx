import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import BookingPage from "./BookingPage";
import { io } from "socket.io-client";
const socket = io("https://expert-booking-backend.onrender.com");
const ExpertDetail = () => {
    const [bookedSlots, setBookedSlots] = useState([]);
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
  socket.on("slotBooked", (data) => {
    if (data.expertId === id) {
      setBookedSlots((prev) => [
        ...prev,
        `${data.date}-${data.timeSlot}`
      ]);
    }
  });

  return () => {
    socket.off("slotBooked");
  };
}, [id]);
  useEffect(() => {
    
    API.get(`/experts/${id}`)
      .then((res) => {
        setExpert(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load expert details");
        setLoading(false);
      });
      API.get(`/bookings?expertId=${id}`).then((res) => {
  const slots = res.data.map(
    (b) => `${b.date}-${b.timeSlot}`
  );
  setBookedSlots(slots);
});
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{expert.name}</h1>
      <p>Category: {expert.category}</p>
      <p>Experience: {expert.experience} years</p>
      <p>Rating: {expert.rating}</p>

      <h2>Available Slots</h2>

      {expert.availableSlots.map((day, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <strong>{day.date}</strong>
          <div>
            {day.slots.map((slot, i) => {
  const isBooked = bookedSlots.includes(
    `${day.date}-${slot}`
  );

  return (
    <button
  key={i}
  className={`slot-btn ${
    isBooked
      ? "slot-booked"
      : selectedSlot === slot
      ? "slot-selected"
      : "slot-available"
  }`}
  disabled={isBooked}
  onClick={() => {
    setSelectedSlot(slot);
    setSelectedDate(day.date);
  }}
>
  {slot}
</button>
  );
})}
          </div>
        </div>
      ))}
        {selectedSlot && (
      <BookingPage
        expertId={expert._id}
        selectedSlot={selectedSlot}
        date={selectedDate}
      />
    )}
  </div>
);
};

export default ExpertDetail;
