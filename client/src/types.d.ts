import type { ReactNode } from "react";

type TaskStatus = 'STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type TaskCategory = 'Work' | 'Personal' | 'Fitness' | 'Household' | 'Social' | 'Finance' | 'Budgeting' | 'Hobbies' | 'Self Care' | 'Errands' | 'Shopping' | 'Travel' | 'Planning' | 'Learning' | 'Health' | 'Other';
type ToastType = 'success' | 'error' | 'info';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  category: TaskCategory;
  status: TaskStatus;
}

interface TaskFormData {
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

interface ToastMessage {
  message: string;
  type: ToastType;
}

interface NavbarProps { isDark: boolean; toggleTheme: () => void; }

interface ToastProps { message: string; type: 'success' | 'error' | 'info'; onClose: () => void; }

interface ModalProps { isOpen: boolean; onClose: () => void; title: string; children: ReactNode; isDark: boolean; }

interface FormInputProps { label: string; error: string; isDark: boolean; }

interface FormSelectProps { label: string; error: string; isDark: boolean; options: {label: string; value: string}[]}

interface TaskProps {
    title: string;
    description: string;
    date: string;
    category: string;
    status: string;
}
interface TaskFormProps { task: TaskProps; onSubmit: ()=> void; onCancel: () => void, isDark }