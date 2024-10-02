import { FC, useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoModal from "./Components/TodoModal";
import { DataProps, ModalsProps, RecordProps } from "./types";
import axios from "axios";

const INITIAL_MODAL = {
  isOpen: false,
  data: {
    id: null,
    title: "",
    description: "",
    date: "",
    category: "",
    isCompleted: false,
  },
};

const App: FC = () => {
  const [record, setRecord] = useState<RecordProps>({
    rows: [],
  });
  const [modal, setModal] = useState<ModalsProps>(INITIAL_MODAL);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (val?: any) => {
    setLoading(true);
    const params = new URLSearchParams({
      page: val?.page ?? 1,
      perPage: val?.perPage ?? 10,
    });
    const res = await axios.get("/api/v1/todo", { params });
    if (res?.data?.success) {
      setRecord(res?.data?.data ?? []);
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
    const res = data?.id
      ? await axios.put(`/api/v1/todo/${data?.id}`, data)
      : await axios.post("/api/v1/todo", data);
    if (res?.data?.success) {
      fetchData();
    }
    closeModal();
  };

  const handleDelete = async (data: DataProps) => {
    const res = await axios.delete(`/api/v1/todo/${data?.id}`);
    if (res?.data?.success) {
      fetchData();
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      {modal?.isOpen && (
        <TodoModal
          open={modal?.isOpen}
          data={modal?.data}
          onCancel={closeModal}
          onSave={handleSave}
          width={650}
        />
      )}
      <TodoList
        loading={loading}
        data={record}
        onAdd={openModal}
        onEdit={openModal}
        onDelete={handleDelete}
        onStatusChange={handleSave}
        fetchData={fetchData}
      />
    </div>
  );
};

export default App;
