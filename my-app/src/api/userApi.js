import axios from 'axios';
import { BASE_URL } from '../config';

const authHeader = () => ({
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const fetchUsers = async () => axios.get(`${BASE_URL}/users`, authHeader());
export const createUser = async (data) => axios.post(`${BASE_URL}/users`, data, authHeader());
export const updateUser = async (id, data) => axios.put(`${BASE_URL}/users/${id}`, data, authHeader());
export const deleteUser = async (id) => axios.delete(`${BASE_URL}/users/${id}`, authHeader());