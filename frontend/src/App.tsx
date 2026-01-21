import { useEffect, useState } from "react";
import type { ParamProps, Task } from "./types";
import Navbar from "./components/Navbar";
import { Plus } from "lucide-react";
import TaskCard from "./components/TaskCard";
import Modal from "./components/Modal";
import TaskForm from "./components/TaskForm";
import { useTask } from "./hooks/useTask";
import Pagination from "./components/Pagination";
import FormSelect from "./components/FormSelect";
import { formatOptions } from "./helper";
import Loader from "./components/Loader";
import toast from "react-hot-toast";

const App: React.FC = () => {

  const [isDark, setIsDark] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Partial<ParamProps & { total: number }>>({
    page: 1,
    perPage: 12,
    total: 0,
    title: '',
    category: '',
    status: '',
  })

  const {
    records,
    isLoading,
    deleteTask,
  } = useTask({
    page: filters.page,
    perPage: filters.perPage,
  });
  console.log(isLoading);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const openEditModal = (task: Task) => {
    setModalOpen(true);
    setEditingTask(task);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    handleFilterChange('page', page);
  };

  const tasks = records?.rows.map((item: any) => ({
    ...item,
    status: item?.isCompleted ? "COMPLETED" : "STARTED",
  })) ?? [];

  const categoryOptions = formatOptions([
    "All",
    ...new Set(tasks?.map((item: Task) => item?.category).filter((i: string): i is string => !!i)),
  ] as string[]);

  return (
    <div className={`min-h-screen transition-colors ${isDark
      ? 'bg-linear-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-linear-to-br from-gray-50 via-white to-gray-50'
      }`}>
      {/* Navbar */}
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(prev => !prev)} />

      {/* Cards */}
      <div className="max-w-8xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {records?.meta?.total} {records?.meta?.total === 1 ? 'task' : 'tasks'} in total
          </p>

          <div className="flex flex-wrap items-center justify-end gap-6">

            <FormSelect
              label=""
              options={categoryOptions}
              isDark={isDark}
              onChange={(e) => handleFilterChange('category', e?.target?.value)}
            />

            <FormSelect
              label=""
              options={formatOptions(["All", "Completed", "Incomplete"])}
              isDark={isDark}
              onChange={(e) => handleFilterChange('status', e?.target?.value)}

            />
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40"
            >
              <Plus className="w-6 h-6" />
              New Task
            </button>
          </div>

        </div>

        {isLoading ? <Loader /> : null}

        {/* Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map((task: Task) => (
            <TaskCard
              key={task?.id}
              task={task}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              isDark={isDark}
            />
          ))}
        </div>

        {!isLoading && tasks?.length === 0 && (
          <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg">No tasks yet. Create your first task to get started!</p>
          </div>
        )}

        {/* Pagination */}
        {tasks.length > 0 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={filters.page!}
              perPage={filters.perPage!}
              total={records.meta.total}
              onPageChange={handlePageChange}
              isDark={isDark}
            />
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
          onCancel={closeModal}
          isDark={isDark}
        />
      </Modal>
    </div>
  );
};

export default App;