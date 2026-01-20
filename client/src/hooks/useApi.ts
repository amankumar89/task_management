import axios from 'axios';
import { toast } from 'sonner';

// API helper
export const api = {
  baseUrl: import.meta.env.VITE_BASE_URL || '',

  async get(endpoint: string, params?: any) {
    try {
      const res = await axios.get(`${this.baseUrl}${endpoint}`, { params });
      return res.data;
    } catch (error) {
      toast.error('Failed to fetch data');
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const res = await axios.post(`${this.baseUrl}${endpoint}`, data);
      return res.data;
    } catch (error) {
      toast.error('Failed to save data');
      throw error;
    }
  },

  async put(endpoint: string, data: any) {
    try {
      const res = await axios.put(`${this.baseUrl}${endpoint}`, data);
      return res.data;
    } catch (error) {
      toast.error('Failed to update data');
      throw error;
    }
  },

  async delete(endpoint: string) {
    try {
      const res = await axios.delete(`${this.baseUrl}${endpoint}`);
      return res.data;
    } catch (error) {
      toast.error('Failed to delete data');
      throw error;
    }
  },
};