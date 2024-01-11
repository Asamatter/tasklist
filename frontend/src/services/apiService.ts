import api from '../../api';

export const fetchData = async () => {
  try {
    const response = await api.get("/tasks/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};