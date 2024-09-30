import { ModalProps } from "antd";

export type DataProps = {
  id: string | number;
  title: string;
  date: string;
  category: string;
  isCompleted: boolean;
};

export type ModalsProps = {
  isOpen: boolean;
  data?: {};
};

export type TodoListProps = {
  data: DataProps[];
  onAdd: () => void;
  onEdit: (data: DataProps) => void;
  onDelete: (data: DataProps) => void;
};

export type TodoModalProps = ModalProps & {
  open: boolean;
  data?: DataProps;
};
