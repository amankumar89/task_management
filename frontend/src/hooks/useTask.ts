import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '@/services/task.api';
import type { ParamProps } from '@/types';

const TODO_QUERY_KEY = ['todos'];

export const useTask = (params?: ParamProps) => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: [...TODO_QUERY_KEY, params],
    queryFn: () => fetchTasks(params),
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onMutate: () => {
      toast.loading('Creating task...', { id: 'create-task' });
    },
    onSuccess: () => {
      toast.success('Task created successfully!', { id: 'create-task' });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: () => {
      toast.error('Failed to create task', { id: 'create-task' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onMutate: () => {
      toast.loading('Updating task...', { id: 'update-task' });
    },
    onSuccess: () => {
      toast.success('Task updated successfully!', { id: 'update-task' });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: () => {
      toast.error('Failed to update task', { id: 'update-task' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: () => {
      toast.loading('Deleting task...', { id: 'delete-task' });
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!', { id: 'delete-task' });
      queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY });
    },
    onError: () => {
      toast.error('Failed to delete task', { id: 'delete-task' });
    },
  });

  return {
    records: tasksQuery?.data?.data,
    isLoading: tasksQuery.isLoading,
    isFetching: tasksQuery.isFetching,
    error: tasksQuery.error,

    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
