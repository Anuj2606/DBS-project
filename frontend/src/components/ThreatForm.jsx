import React, { useState } from "react";
import axios from "axios";

const ThreatForm = () => {
  const [formData, setFormData] = useState({
    threat_name: "",
    threat_type: "SQL Injection",
    threat_level: "Low",
    description: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/add-threat",
        formData
      );
      alert("Threat added successfully!");
      setFormData({
        threat_name: "",
        threat_type: "SQL Injection",
        threat_level: "Low",
        description: "",
      });
    } catch (error) {
      console.error("Error adding threat:", error);
    }
  };

  return (
    <div>
      <h2>Add Threat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="threat_name"
          value={formData.threat_name}
          onChange={handleChange}
          placeholder="Threat Name"
          required
        />
        <select name="threat_type" value={formData.threat_type} onChange={handleChange}>
          <option value="SQL Injection">SQL Injection</option>
          <option value="DDoS">DDoS</option>
          <option value="Phishing">Phishing</option>
          <option value="Malware">Malware</option>
          <option value="Other">Other</option>
        </select>
        <select name="threat_level" value={formData.threat_level} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Threat</button>
      </form>
    </div>
  );
};

export default ThreatForm;
