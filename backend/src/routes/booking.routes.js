const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings,
  updateBookingStatus
} = require("../controllers/booking.controller");

router.post("/", createBooking);
router.get("/", getBookings);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;