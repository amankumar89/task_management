import { FC } from "react";
import { Table, Flex, Tag, Tooltip, TableColumnProps, Button } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DataProps, TodoListProps } from "../types";

const TodoList: FC<TodoListProps> = ({
  data = [],
  onAdd,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumnProps<DataProps>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 200,
      render: (record: DataProps) => (
        <Flex gap={8} justify="center" wrap>
          <button
            type="button"
            className="py-2 px-3 rounded hover:bg-green-100"
            onClick={() => onEdit(record)}
          >
            <Tooltip title="Edit">
              <EditOutlined style={{ color: "green", fontSize: 18 }} />
            </Tooltip>
          </button>
          <button
            type="button"
            className="py-2 px-3 rounded hover:bg-red-100"
            onClick={() => onDelete(record)}
          >
            <Tooltip title="Delete">
              <DeleteOutlined style={{ color: "red", fontSize: 18 }} />
            </Tooltip>
          </button>
        </Flex>
      ),
    },
  ];

  return (
    <div className="w-2/3 py-4">
      <Table
        title={() => (
          <div className="flex justify-between">
            <div className="text-3xl pl-2">Todo List</div>
            <div>
              <Button type="primary" onClick={onAdd}>
                <span>Add Task</span>
                <PlusOutlined />
              </Button>
            </div>
          </div>
        )}
        columns={columns}
        dataSource={data}
        bordered
        rowKey="id"
        rowSelection={{
          selectedRowKeys: data?.map((i) => i?.id),
          onChange: () => {},
        }}
      />
    </div>
  );
};

export default TodoList;
