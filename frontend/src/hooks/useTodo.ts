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

interface ParamProps {
  page?: number;
  perPage?: number;
  title?: string;
  category?: string;
  status?: string;
}

const INITITAL_TASK: RecordProps = {
  rows: [],
  meta: {
    page: 0,
    total: 0,
  }
}
export const useTodo = () => {
  const [records, setRecords] = useState<RecordProps>({...INITITAL_TASK});
  const [loading, setLoading] = useState(false);

  const fetchData = async (params?: ParamProps) => {
    params = {
      ...params,
      page: params?.page ?? 1,
      perPage: params?.perPage ?? 12,
    }
    setLoading(true);
    if(params?.category === "All") params.category = undefined;
    try {
      const res = await api.get('/api/v1/todo', params);
      if (res?.success) {
        setRecords(structuredClone(res?.data) ?? []);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveTodo = async (data: any) => {
    setLoading(true);
    try {
      const res = data?.id
        ? await api.put(`/api/v1/todo/${data.id}`, data)
        : await api.post('/api/v1/todo', data);
      
      if (res?.success) {
        toast.success(`Task ${data?.id ? 'updated' : 'created'} successfully`);
        fetchData();
      }
    } catch (error) {
        console.error(error);
      toast.error("Failed to delete.");
    } finally{
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.delete(`/api/v1/todo/${id}`);
      if (res?.success) {
        toast.success('Task deleted successfully');
        fetchData();
      }
    } catch (error) {
        console.error(error);
        toast.error("Failed to delete task.");
    } finally{
      setLoading(false);
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