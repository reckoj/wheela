import axios from "axios";

// Define your API base URL
const API_BASE_URL = `https://car-api2.p.rapidapi.com`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch vehicle makes
export const fetchMakes = async () => {
  const value = "/api/makes";
  try {
    const response = await api.get(`${value}`);
    answer = response.data;

    console.log(`this is the response ${answer}`);
    return answer;
  } catch (error) {
    console.error("Error fetching makes:", error);
    throw error;
  }
};

// Function to fetch vehicle models for a given make
export const fetchModels = async (makeId) => {
  const value = `/api/models?makeId=${makeId}`;
  try {
    const response = await api.get(`${value}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

// Function to fetch vehicle years for a given make and model
export const fetchYears = async (makeId, modelId) => {
  const value = `/api/years?makeId=${makeId}&modelId=${modelId}`;
  try {
    const response = await api.get(`${value}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching years:", error);
    throw error;
  }
};

export default api;
