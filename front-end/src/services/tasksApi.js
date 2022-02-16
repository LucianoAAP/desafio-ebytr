import axios from 'axios';

const API_URL = 'http://localhost:3001/tasks';

export const getTasks = async () => (
  axios.get(API_URL).then((result) => result.data)
    .catch((error) => console.log(error))
);

export const createTask = async (body) => (
  axios.post(API_URL, body).then((result) => result.data)
    .catch((error) => console.log(error))
);

export const updateTask = async ({ id, activity, status }) => (
  axios.put(`${API_URL}/${id}`, { activity, status }).then((result) => result.data)
    .catch((error) => console.log(error))
);

export const removeTask = async (id) => (
  axios.delete(`${API_URL}/${id}`).then((result) => result.data)
    .catch((error) => console.log(error))
);
