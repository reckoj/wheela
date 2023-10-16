import axios from "axios";

const API_BASE_URL = `https://car-api2.p.rapidapi.com`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
