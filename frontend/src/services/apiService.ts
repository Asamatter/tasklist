import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get("https://backend-production-7211.up.railway.app/api/tasks/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};