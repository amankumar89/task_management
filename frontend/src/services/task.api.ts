import api from '@/api/useApi';
import type { ParamProps, Task } from '@/types';

export const fetchTasks = async (params?: ParamProps) => {
  const res = await api.get('/api/v1/todo', { params });
  return res.data;
};

export const createTask = async (data: Partial<Task>) => {
  const res = await api.post('/api/v1/todo', data);
  return res.data;
};

export const updateTask = async (data: Task) => {
  if(!data?.id) return;
  const res = await api.put(`/api/v1/todo/${data.id}`, data);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/api/v1/todo/${id}`);
  return res.data;
};
