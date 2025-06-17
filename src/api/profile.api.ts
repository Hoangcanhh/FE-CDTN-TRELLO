import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

export const updateUser = async (id: number, updateData: Record<string, any>) => {
  const response = await axios.patch(`${API_URL}/${id}`, updateData);
  // Cập nhật lại localStorage nếu muốn
  localStorage.setItem('user', JSON.stringify(response.data));
  return response.data;
};