import { FC, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoModal from "./Components/TodoModal";
import { DataProps, ModalsProps } from "./types";

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

  const openModal = (data?: DataProps) => {
    setModal(() => ({ isOpen: true, data }));
  };

  const closeModal = () => {
    setModal(INITIAL_MODAL);
  };

  const handleSave = (data: DataProps) => {
    const tempData = data?.id ? data : { ...data, id: Date.now() };
    setData((prev) => [...prev, tempData]);
    closeModal();
  };

  const handleDelete = (data: DataProps) => {
    setData((prev) => prev.filter((item) => item.id !== data.id));
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
        data={data}
        onAdd={openModal}
        onEdit={openModal}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
