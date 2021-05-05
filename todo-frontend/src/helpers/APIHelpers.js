
import axios from "axios";

const API_URL = "http://localhost:5001/todo/";

export const getAllTodos = async () => {
    try {
      const { data } = await axios.get(API_URL)
      return data;
    } catch (error) {
      return 'error';
    }
};

export async function getTaskById(id) {
  const message = await axios.get(`${API_URL}${id}`);
  return message;
};

export async function createTodo({task, date}) {
  const { data } = await axios.post(API_URL, {
    task,
    date,
  })
  return data;
};

export async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`);
  return message;
};

export async function updateTodo(id, value) {
  const { data } = await axios.put(`${API_URL}${id}`, value);
  return data;
};

export async function removeTasks() {
  const { data } = await axios.delete(`${API_URL}`);
  return data;
};
