import { FC, useState } from 'react';
import TodoList from './Components/TodoList';
import TodoModal from './Components/TodoModal';
import { DataProps } from './types';

const data: DataProps[] = [
  {
    id: '1',
    title: 'Sample Title 1',
    date: '2024-09-15',
    category: 'Category 1',
  },
  {
    id: '2',
    title: 'Sample Title 2',
    date: '2024-09-16',
    category: 'Category 2',
  },
];

const App:FC = () => {
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className='w-screen h-screen flex justify-center'>
      <TodoModal open={modal} />
      <TodoList
        data={data}
        onAdd={() => setModal(true)}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  )
}

export default App