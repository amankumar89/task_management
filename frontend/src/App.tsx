import { FC, useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoModal from "./Components/TodoModal";
import { DataProps, FetchDataProps, ModalsProps, RecordProps } from "./types";
import axios from "axios";
import { message } from "antd";

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

  const fetchData = async (val?: FetchDataProps) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (val?.page ?? 1)?.toString(),
        perPage: (val?.perPage ?? 10).toString(),
      });
      if (val?.searchText) {
        params.append("title", val?.searchText);
      }
      if (val?.category) {
        params.append("category", val?.category);
      }
      if (val?.status) {
        params.append("status", val?.status);
      }
      const res = await axios.get("/api/v1/todo", { params });
      if (res?.data?.success) {
        setRecord(res?.data?.data ?? []);
      }
    } catch {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
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
    try {
      const res = data?.id
        ? await axios.put(`/api/v1/todo/${data?.id}`, data)
        : await axios.post("/api/v1/todo", data);
      if (res?.data?.success) {
        message.success(
          `Task ${data?.id ? "updated" : "created"} successfully`
        );
        fetchData();
      }
    } catch {
      message.error(`Failed to ${data?.id ? "update" : "create"} task`);
    } finally {
      closeModal();
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
        fetchData={fetchData}
      />
    </div>
  );
};

export default App;
