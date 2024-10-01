import { FC, useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoModal from "./Components/TodoModal";
import { DataProps, ModalsProps } from "./types";
import axios from "axios";

const INITIAL_MODAL = {
  isOpen: false,
  data: {
    id: "",
    title: "",
    date: "",
    category: "",
    isCompleted: false,
  },
};

const App: FC = () => {
  const [data, setData] = useState<DataProps[]>([]);
  const [modal, setModal] = useState<ModalsProps>(INITIAL_MODAL);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/todo");
    if (res?.data?.success) {
      setData(res?.data?.data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const openModal = (data?: DataProps) => {
    setModal(() => ({ isOpen: true, data }));
  };

  const closeModal = () => {
    setModal(INITIAL_MODAL);
  };

  const handleSave = async (data: DataProps) => {
    setLoading(true);
    const res = await axios.post("/api/v1/todo/create", data);
    if (res?.data?.success) {
      fetchData();
    }
    closeModal();
  };

  const handleDelete = async (data: DataProps) => {
    setLoading(true);
    const res = await axios.delete(`/api/v1/delete-todo/${data?.id}`);
    if (res?.data?.success) {
      fetchData();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <TodoModal
        open={modal?.isOpen}
        data={modal?.data}
        onCancel={closeModal}
        onSave={handleSave}
        width={650}
      />
      <TodoList
        loading={loading}
        data={data}
        onAdd={openModal}
        onEdit={openModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
