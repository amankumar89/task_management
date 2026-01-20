import type { Task, TaskCategory, TaskStatus } from "@/types";
import { Calendar, Pencil, Tag, Trash2 } from "lucide-react";

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: number) => void;
    isDark: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, isDark }) => {
    const statusConfig: Record<TaskStatus, { color: string; label: string; bgClass: string; textClass: string; borderClass?: string }> = {
        COMPLETED: {
            color: 'emerald',
            label: 'Completed',
            bgClass: 'bg-emerald-500/10',
            textClass: isDark ? 'text-emerald-400' : 'text-emerald-600',
            borderClass: 'border-emerald-500/20'
        },
        STARTED: {
            color: 'blue',
            label: 'Started',
            bgClass: 'bg-blue-500/10',
            textClass: isDark ? 'text-blue-400' : 'text-blue-600',
            borderClass: 'border-blue-500/20'
        },
        IN_PROGRESS: {
            color: 'amber',
            label: 'In Progress',
            bgClass: 'bg-amber-500/10',
            textClass: isDark ? 'text-amber-400' : 'text-amber-600',
            borderClass: 'border-amber-500/20'
        }
    };

    const categoryConfig: Record<TaskCategory, { color: string; label: string; bgClass: string; textClass: string; borderClass: string }> = {
        Work: {
            color: 'purple',
            label: 'Work',
            bgClass: 'bg-purple-500/10',
            textClass: isDark ? 'text-purple-400' : 'text-purple-600',
            borderClass: 'border-purple-500/20'
        },
        Personal: {
            color: 'pink',
            label: 'Personal',
            bgClass: 'bg-pink-500/10',
            textClass: isDark ? 'text-pink-400' : 'text-pink-600',
            borderClass: 'border-pink-500/20'
        },
        Fitness: {
            color: 'orange',
            label: 'Fitness',
            bgClass: 'bg-orange-500/10',
            textClass: isDark ? 'text-orange-400' : 'text-orange-600',
            borderClass: 'border-orange-500/20'
        },
        Household: {
            color: 'teal',
            label: 'Household',
            bgClass: 'bg-teal-500/10',
            textClass: isDark ? 'text-teal-400' : 'text-teal-600',
            borderClass: 'border-teal-500/20'
        },
        Social: {
            color: 'cyan',
            label: 'Social',
            bgClass: 'bg-cyan-500/10',
            textClass: isDark ? 'text-cyan-400' : 'text-cyan-600',
            borderClass: 'border-cyan-500/20'
        },
        Finance: {
            color: 'green',
            label: 'Finance',
            bgClass: 'bg-green-500/10',
            textClass: isDark ? 'text-green-400' : 'text-green-600',
            borderClass: 'border-green-500/20'
        },
        Budgeting: {
            color: 'emerald',
            label: 'Budgeting',
            bgClass: 'bg-emerald-500/10',
            textClass: isDark ? 'text-emerald-400' : 'text-emerald-600',
            borderClass: 'border-emerald-500/20'
        },
        Hobbies: {
            color: 'violet',
            label: 'Hobbies',
            bgClass: 'bg-violet-500/10',
            textClass: isDark ? 'text-violet-400' : 'text-violet-600',
            borderClass: 'border-violet-500/20'
        },
        'Self Care': {
            color: 'rose',
            label: 'Self Care',
            bgClass: 'bg-rose-500/10',
            textClass: isDark ? 'text-rose-400' : 'text-rose-600',
            borderClass: 'border-rose-500/20'
        },
        Errands: {
            color: 'amber',
            label: 'Errands',
            bgClass: 'bg-amber-500/10',
            textClass: isDark ? 'text-amber-400' : 'text-amber-600',
            borderClass: 'border-amber-500/20'
        },
        Shopping: {
            color: 'fuchsia',
            label: 'Shopping',
            bgClass: 'bg-fuchsia-500/10',
            textClass: isDark ? 'text-fuchsia-400' : 'text-fuchsia-600',
            borderClass: 'border-fuchsia-500/20'
        },
        Travel: {
            color: 'sky',
            label: 'Travel',
            bgClass: 'bg-sky-500/10',
            textClass: isDark ? 'text-sky-400' : 'text-sky-600',
            borderClass: 'border-sky-500/20'
        },
        Planning: {
            color: 'indigo',
            label: 'Planning',
            bgClass: 'bg-indigo-500/10',
            textClass: isDark ? 'text-indigo-400' : 'text-indigo-600',
            borderClass: 'border-indigo-500/20'
        },
        Learning: {
            color: 'blue',
            label: 'Learning',
            bgClass: 'bg-blue-500/10',
            textClass: isDark ? 'text-blue-400' : 'text-blue-600',
            borderClass: 'border-blue-500/20'
        },
        Health: {
            color: 'red',
            label: 'Health',
            bgClass: 'bg-red-500/10',
            textClass: isDark ? 'text-red-400' : 'text-red-600',
            borderClass: 'border-red-500/20'
        },
        Other: {
            color: 'gray',
            label: 'Other',
            bgClass: 'bg-gray-500/10',
            textClass: isDark ? 'text-gray-400' : 'text-gray-600',
            borderClass: 'border-gray-500/20'
        }
    };

    const status = statusConfig[task?.status];

    const category = categoryConfig[task?.category];

    return (
        <div className={`flex flex-col justify-between group rounded-xl p-5 transition-all border ${isDark
            ? 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:shadow-xl hover:shadow-purple-500/5'
            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl hover:shadow-purple-500/10'
            }`}>
            <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${category?.bgClass} ${category?.textClass} border ${category?.borderClass || 'border-gray-500/20'}`}>
                    <Tag className="w-3 h-3" />
                    {category?.label}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status?.bgClass} ${status?.textClass} border ${status?.borderClass}`}>
                    {status?.label}
                </span>
            </div>

            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {task?.title}
            </h3>

            <p className={`text-sm mb-3 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {task?.description}
            </p>

            <div className={`flex items-center gap-2 text-xs mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(task?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </div>

            <div className={`h-px mb-4 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}></div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(task)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                        ? 'bg-slate-700/50 hover:bg-slate-700 border border-slate-600 text-gray-300 hover:text-blue-400 hover:border-blue-500/50'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-300'
                        }`}
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task?.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark
                        ? 'bg-slate-700/50 hover:bg-red-500/10 border border-slate-600 text-gray-300 hover:text-red-400 hover:border-red-500/50'
                        : 'bg-gray-50 hover:bg-red-50 border border-gray-200 text-gray-700 hover:text-red-600 hover:border-red-300'
                        }`}
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;