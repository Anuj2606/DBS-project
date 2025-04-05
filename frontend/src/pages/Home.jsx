import React, { useEffect, useState } from "react";
import { getThreats, deleteThreat } from "../api/api";
import ThreatList from "../components/ThreatList";
import "../styles/styles.css";

const Home = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    fetchThreats();
  }, []);

  const fetchThreats = async () => {
    const data = await getThreats();
    setThreats(data);
  };

  const handleDelete = async (id) => {
    await deleteThreat(id);
    fetchThreats(); // Refresh after delete
  };

  return (
    <div className="container">
      <ThreatList threats={threats} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
