import { ModalProps } from "antd";

export type DataProps = {
  id: number | null;
  title: string;
  date: string;
  category: string;
  isCompleted: boolean;
  description: string;
};

export type ModalsProps = {
  isOpen: boolean;
  data?: DataProps;
};

export type TodoListProps = {
  loading?: boolean;
  data: DataProps[];
  onAdd: () => void;
  onEdit: (data: DataProps) => void;
  onDelete: (data: DataProps) => void;
  onStatusChange: (data: DataProps) => void;
};

export type TodoModalProps = ModalProps & {
  open: boolean;
  data?: DataProps;
  onSave: (data: DataProps) => void;
};
