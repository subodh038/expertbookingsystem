const Booking = require("../models/Booking");

// POST /bookings
exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    global.io.emit("slotBooked", {
  expertId: booking.expertId,
  date: booking.date,
  timeSlot: booking.timeSlot
});
    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked"
      });
    }
    res.status(500).json({
      message: error.message
    });
  }
};

// GET /bookings?email=
// GET /bookings?email=&expertId=
exports.getBookings = async (req, res) => {
  try {
    const { email, expertId } = req.query;

    let filter = {};
    if (email) filter.email = email;
    if (expertId) filter.expertId = expertId;

    const bookings = await Booking.find(filter);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PATCH /bookings/:id/status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};