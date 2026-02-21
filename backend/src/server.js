const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// 🔥 Make io global
global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

app.use("/experts", require("./routes/expert.routes"));
app.use("/bookings", require("./routes/booking.routes"));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);