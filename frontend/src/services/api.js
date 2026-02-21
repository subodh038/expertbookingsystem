import axios from "axios";

const API = axios.create({
baseURL: "https://expert-booking-backend.onrender.com"
});

export default API;
