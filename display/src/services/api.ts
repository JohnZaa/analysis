// src/services/api.ts
import axios from 'axios';

export const fetchData = async () => {
  const { data } = await axios.get('/api/data');
  return data;
};