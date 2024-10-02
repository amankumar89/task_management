import { ModalProps } from "antd";

export type DataProps = {
  id?: number | null;
  title: string;
  date: string;
  category: string;
  isCompleted?: boolean;
  description: string;
};

export type RecordProps = {
  meta?: {
    total: number;
    page: number;
  };
  rows?: DataProps[];
};

export type ModalsProps = {
  isOpen: boolean;
  data?: DataProps;
};

export type TodoListProps = {
  loading?: boolean;
  data: RecordProps;
  onAdd: () => void;
  onEdit: (data: DataProps) => void;
  onDelete: (data: DataProps) => void;
  onStatusChange: (data: DataProps) => void;
  fetchData: (val: any) => void;
};

export type TodoModalProps = ModalProps & {
  open: boolean;
  data?: DataProps;
  onSave: (data: DataProps) => void;
};
