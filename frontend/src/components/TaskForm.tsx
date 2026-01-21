import { useState } from "react";
import FormSelect from "./FormSelect";
import type { FormErrors, Task, TaskFormData } from "@/types";
import FormInput from "./FormInput";
import { CATEGORY_LISTS } from "@/helper";
import Loader from "./Loader";
import { useTodo } from "@/hooks/useTodo";

interface TaskFormProps {
    task: Task | null;
    // onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
    isDark: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onCancel, isDark }) => {
    // hooks
    const { loading, saveTodo } = useTodo();

    // states
    const [formData, setFormData] = useState<TaskFormData>({
        title: task?.title || '',
        description: task?.description || '',
        date: task?.date || new Date().toISOString().split('T')[0],
        category: task?.category || 'Other',
        status: task?.status || 'STARTED'
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.date) newErrors.date = 'Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            await saveTodo(formData);
        }
        onCancel();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <>
            {loading ? <Loader /> : null}
            <FormInput
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
                isDark={isDark}
                placeholder="Enter task title"
            />

            <div className="mb-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-2.5 rounded-lg border transition-colors resize-none ${errors.description
                        ? 'border-red-500 focus:border-red-500'
                        : isDark
                            ? 'bg-slate-900 border-slate-600 text-white focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter task description"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <FormInput
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
                isDark={isDark}
            />

            <FormSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                isDark={isDark}
                options={CATEGORY_LISTS}
            />

            <FormSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                isDark={isDark}
                options={[
                    { value: 'STARTED', label: 'Started' },
                    { value: 'IN_PROGRESS', label: 'In Progress' },
                    { value: 'COMPLETED', label: 'Completed' }
                ]}
            />

            <div className="w-full flex flex-wrap gap-2 mt-6">
                <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
                >
                    {task ? 'Update' : 'Create'}
                </button>
                <button
                    onClick={onCancel}
                    className={`flex-1 py-2.5 font-medium rounded-lg transition-colors ${isDark
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                        }`}
                >
                    Cancel
                </button>
            </div>
        </>
    );
};

export default TaskForm;