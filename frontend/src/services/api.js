import axios from 'axios';
const API_URL = "http://localhost:3080/api"; // Ajustar según entorno

export const getTareas = () => axios.get(`${API_URL}/tareas`);
export const crearTarea = (data) => axios.post(`${API_URL}/tareas`, data);
export const editarTarea = (id, data) => axios.put(`${API_URL}/tareas/${id}`, data);
export const eliminarTarea = (id) => axios.delete(`${API_URL}/tareas/${id}`);
