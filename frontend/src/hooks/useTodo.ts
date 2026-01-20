import { useState } from 'react';
import { api } from './useApi';
import type { Task } from '@/types';
import toast from 'react-hot-toast';

interface RecordProps {
  meta: {
    page: number;
    total: number;
  },
  rows: Task[]
}

const INITITAL_TASK: RecordProps = {
  rows: [],
  meta: {
    page: 0,
    total: 0,
  }
}
export const useTodo = () => {
  const [records, setRecords] = useState<RecordProps>(INITITAL_TASK);
  const [loading, setLoading] = useState(false);

  const fetchData = async (params?: {
    page?: number;
    perPage?: number;
    title?: string;
    category?: string;
    status?: string;
  }) => {
    setLoading(true);
    if(params?.category === "All") params.category = undefined;
    try {
      const res = await api.get('/api/v1/todo', params);
      if (res?.success) {
        setRecords(res?.data ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveTodo = async (data: any) => {
    try {
      const res = data?.id
        ? await api.put(`/api/v1/todo/${data.id}`, data)
        : await api.post('/api/v1/todo', data);
      
      if (res?.success) {
        //
        toast.success(`Task ${data?.id ? 'updated' : 'created'} successfully`);
        fetchData();
      }
    } catch (error) {
        console.error(error);
      toast.error("Failed to delete.");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await api.delete(`/api/v1/todo/${id}`);
      if (res?.success) {
        toast.success('Task deleted successfully');
        fetchData();
      }
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete task.");
    }
  };

  return {
    records,
    loading,
    fetchData,
    saveTodo,
    deleteTodo,
  };
};