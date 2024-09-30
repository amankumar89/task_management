import { FC, useState } from "react";
import TodoList from "./Components/TodoList";
import TodoModal from "./Components/TodoModal";
import { DataProps, ModalsProps } from "./types";

const data: DataProps[] = [
  {
    id: "1",
    title: "Sample Title 1",
    date: "2024-09-15",
    category: "Category 1",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Sample Title 2",
    date: "2024-09-16",
    category: "Category 2",
    isCompleted: false,
  },
];

const INITIAL_MODAL = {
  isOpen: false,
  data: {},
};

const App: FC = () => {
  const [modal, setModal] = useState<ModalsProps>(INITIAL_MODAL);

  const openModal = (data?: any) => {
    setModal(() => ({ isOpen: true, data: {} }));
  };

  const closeModal = () => {
    setModal(INITIAL_MODAL);
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <TodoModal open={modal?.isOpen} onCancel={closeModal} />
      <TodoList
        data={data}
        onAdd={openModal}
        onEdit={openModal}
        onDelete={() => {}}
      />
    </div>
  );
};

export default App;
