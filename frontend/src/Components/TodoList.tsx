import { FC } from "react";
import {
  Input,
  Table,
  Flex,
  Tag,
  Tooltip,
  TableColumnProps,
  Button,
  Switch,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DataProps, TodoListProps } from "../types";
import dayjs from "dayjs";

const TodoList: FC<TodoListProps> = ({
  loading,
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
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      key: "category",
      align: "center",
      render: (value: boolean) => <Switch checked={value} />,
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

  // const rowSelections = {
  //   selectedRowKeys: data?.filter((i) => i.isCompleted)?.map((i) => i?.id),
  //   onChange: () => {},
  // };

  return (
    <div className="w-2/3 py-4">
      <Table
        title={() => (
          <div className="flex justify-between">
            <Input.Search placeholder="Search task..." className="w-1/2" />
            <div>
              <Button type="primary" onClick={() => onAdd()}>
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
        // rowSelection={rowSelections}
        pagination={{
          pageSize: 10,
          total: data?.length,
          showSizeChanger: false,
        }}
        loading={loading}
      />
    </div>
  );
};

export default TodoList;
