import { useEffect, useState } from "react";
import type { Task, TaskFormData, ToastMessage, ToastType } from "./types";
import Navbar from "./components/Navbar";
import { Plus } from "lucide-react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import Toast from "./components/Toast";
import { useTodo } from "./hooks/useTodo";
import Pagination from "./components/Pagination";

const App: React.FC = () => {
  const {
    loading,
    records,
    saveTodo,
    fetchData,
    deleteTodo,
  } = useTodo();

  const [isDark, setIsDark] = useState<boolean>(true);
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    perPage: 12,
    total: 0,
  })

  useEffect(() => {
    fetchData({
      page: pagination.current,
      perPage: pagination.perPage,
    });
  }, [])

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const handleCreateTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData
    };
    // setTasks(prev => [newTask, ...prev]);
    setModalOpen(false);
    showToast('Task created successfully!', 'success');
  };

  const handleUpdateTask = (taskData: TaskFormData) => {
    if (!editingTask) return;

    // setTasks(prev => prev.map(t =>
    //   t.id === editingTask.id ? { ...t, ...taskData } : t
    // ));
    setModalOpen(false);
    setEditingTask(null);
    showToast('Task updated successfully!', 'success');
  };

  const handleDeleteTask = (id: number) => {
    // setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Task deleted successfully!', 'info');
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const tasks = records?.rows.map((item: any) => ({
    ...item,
    status: item?.isCompleted ? "COMPLETED" : "STARTED",
  })) ?? [];

  const handlePageChange = (page: number) => {
    fetchData({
      page,
      perPage: pagination.perPage,
    })
    setPagination((prev) => ({
      ...prev,
      current: page,
    }))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark
      ? 'bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-linear-to-br from-gray-50 via-white to-gray-50'
      }`}>
      {/* Navbar */}
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(prev => !prev)} />

      {/* Cards */}
      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              My Tasks
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} in total
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map(task => (
            <TaskCard
              key={task?.id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              isDark={isDark}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.current}
            perPage={pagination.perPage}
            total={records.meta.total}
            onPageChange={handlePageChange}
            isDark={isDark}
          />
        </div>

        {tasks.length === 0 && (
          <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg">No tasks yet. Create your first task to get started!</p>
          </div>
        )}
      </div>

      {/* Create / Edit Task Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        isDark={isDark}
      >
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={closeModal}
          isDark={isDark}
        />
      </Modal>

      {/* Toast Message */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default App;