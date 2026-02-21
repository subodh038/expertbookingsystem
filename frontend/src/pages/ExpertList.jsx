import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/experts")
      .then((res) => {
        setExperts(res.data.experts);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load experts");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
         <a href="/my-bookings">
      <button style={{ marginBottom: "15px" }}>
        My Bookings
      </button>
    </a>
      <h1>Experts</h1>
{experts.map((expert) => (
  <div
    key={expert._id}
    style={{
      border: "1px solid #ccc",
      padding: "10px",
      marginBottom: "10px"
    }}
  >
    <div className ="card">
    <h3>{expert.name}</h3>
    <p>Category: {expert.category}</p>
    <p>Experience: {expert.experience} years</p>
    <p>Rating: {expert.rating}</p>
</div>
    <Link to={`/expert/${expert._id}`}>
      <button>View Details</button>
    </Link>
  </div>
))}
    </div>
  );
};

export default ExpertList;