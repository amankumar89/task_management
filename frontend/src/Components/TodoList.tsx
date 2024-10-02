import { FC, useState } from "react";
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
type PaginationProps = {
  pageSize: number;
  current: number;
  total: number;
};

const COLORS: any = {
  Work: "#1890ff",
  "Personal Development": "#2db7f5",
  Fitness: "#87d068",
  "Household Chores": "#faad14",
  Social: "#f50",
  "Finance & Budgeting": "#722ed1",
  Hobbies: "#13c2c2",
  "Self-care": "#eb2f96",
  Errands: "#fa8c16",
  Shopping: "#52c41a",
  "Travel & Planning": "#1890ff",
  Learning: "#fadb14",
  Health: "#73d13d",
  Other: "#bfbfbf",
};

const formatOptions = (data: string[]) =>
  data?.map((i) => ({
    value: i,
    label: i,
  }));

const TodoList: FC<TodoListProps> = ({
  loading,
  data,
  onAdd,
  onEdit,
  onDelete,
  onStatusChange,
  fetchData,
}) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    pageSize: 10,
    current: 1,
    total: data?.meta?.total ?? 0,
  });

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
      render: (text: string) => (
        <Tag color={COLORS?.[text] ?? "blue-inverse"}>{text}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isCompleted",
      key: "category",
      align: "center",
      render: (value: boolean, record: DataProps) => (
        <Switch
          checked={value}
          onClick={() => onStatusChange({ ...record, isCompleted: !value })}
        />
      ),
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
    ...new Set(data?.rows?.map((item) => item?.category)),
  ]);

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
    fetchData({
      page: pagination?.current,
      perPage: pagination?.pageSize,
    });
  };

  return (
    <div className="w-full p-4">
      <Table
        title={() => (
          <Row align="middle" justify="space-between">
            <Col span={8}>
              <Input.Search
                onSearch={(val) =>
                  fetchData({
                    searchText: val,
                  })
                }
                placeholder="Search task..."
                className=""
                allowClear
              />
            </Col>
            <Col span={4}>
              <Select
                options={categoryOptions}
                placeholder="Filter by Category"
                className="w-full"
                allowClear
                onSelect={(val) => {
                  fetchData({
                    category: val,
                  });
                }}
                onClear={() => {
                  fetchData({});
                }}
              />
            </Col>
            <Col span={4}>
              <Select
                options={formatOptions(["Completed", "Incomplete"])}
                placeholder="Filter by Status"
                className="w-full"
                allowClear
                onSelect={(val) => {
                  fetchData({
                    status: val,
                  });
                }}
                onClear={() => {
                  fetchData({});
                }}
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
        dataSource={data?.rows}
        bordered
        rowKey="id"
        pagination={{
          ...pagination,
          total: data?.meta?.total,
        }}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TodoList;
