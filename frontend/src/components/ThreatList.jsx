import React, { useEffect, useState } from "react";
import axios from "axios";

const ThreatList = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/threats")
      .then((res) => setThreats(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Threat List</h2>
      <ul>
      {threats.map((threat) => (
  <div key={threat.threat_id} className="threat-item">
    <h3>{threat.threat_name}</h3>
    <p>{threat.description}</p>
    <button onClick={() => deleteThreat(threat.threat_id)} className="btn btn-danger">
      Delete
    </button>
  </div>
))}
      </ul>
    </div>
  );
};

export default ThreatList;
