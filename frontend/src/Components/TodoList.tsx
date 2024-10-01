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
  Row,
  Col,
  Select,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DataProps, TodoListProps } from "../types";
import dayjs from "dayjs";

const formatOptions = (data: string[]) =>
  data?.map((i) => ({
    value: i,
    label: i,
  }));

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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      align: "center",
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

  const categoryOptions = formatOptions([
    ...new Set(data?.map((item) => item?.category)),
  ]);

  return (
    <div className="w-full p-4">
      <Table
        title={() => (
          <Row align="middle" justify="space-between">
            <Col span={8}>
              <Input.Search placeholder="Search task..." className="" />
            </Col>
            <Col span={4}>
              <Select
                options={categoryOptions}
                placeholder="Filter by Category"
                className="w-full"
                allowClear
                onSelect={() => {}}
                onClear={() => {}}
              />
            </Col>
            <Col span={4}>
              <Select
                options={formatOptions(["Completed", "Incomplete"])}
                placeholder="Filter by Status"
                className="w-full"
                allowClear
                onSelect={() => {}}
                onClear={() => {}}
              />
            </Col>
            <Col>
              <Button type="primary" onClick={() => onAdd()}>
                <span>Add Task</span>
                <PlusOutlined />
              </Button>
            </Col>
          </Row>
        )}
        columns={columns}
        dataSource={data}
        bordered
        rowKey="id"
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
