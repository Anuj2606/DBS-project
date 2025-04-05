import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

// Get all threats
export const getThreats = async () => {
  const response = await axios.get(`${API_URL}/threats`);
  return response.data;
};

// Add a new threat
export const addThreat = async (threatData) => {
  const response = await axios.post(`${API_URL}/threats`, threatData);
  return response.data;
};

// Delete a threat
export const deleteThreat = async (id) => {
  const response = await axios.delete(`${API_URL}/threats/${id}`);
  return response.data;
};
