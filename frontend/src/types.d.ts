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
  fetchData: (val: FetchDataProps) => void;
};

export type TodoModalProps = ModalProps & {
  open: boolean;
  data?: DataProps;
  onSave: (data: DataProps) => void;
};

export type FetchDataProps = {
  page?: number;
  perPage?: number;
  searchText?: string;
  category?: string;
  status?: string;
};
