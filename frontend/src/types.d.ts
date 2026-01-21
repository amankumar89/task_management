import type { ReactNode } from "react";

type TaskStatus = 'STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type TaskCategory = 'Work' | 'Personal' | 'Fitness' | 'Household' | 'Social' | 'Finance' | 'Budgeting' | 'Hobbies' | 'Self Care' | 'Errands' | 'Shopping' | 'Travel' | 'Planning' | 'Learning' | 'Health' | 'Other';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  category: TaskCategory;
  status: TaskStatus;
}

interface TaskFormData {
  id?: number | string;
  title: string;
  description: string;
  date: string;
  category: TaskCategory;
  status: TaskStatus;
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
}