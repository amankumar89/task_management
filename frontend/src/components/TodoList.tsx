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
  Select,
  message,
  TablePaginationConfig,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { DataProps, TodoListProps } from "../types";
import dayjs from "dayjs";
import axios from "axios";
import { generateUrl } from "../utils";

const COLORS: { [key: string]: string } = {
  Work: "#1890ff",
  Personal: "#2db7f5",
  Fitness: "#87d068",
  Household: "#faad14",
  Social: "#f50",
  Finance: "#722ed1",
  Budgeting: "#722ed1",
  Hobbies: "#13c2c2",
  "Self Care": "#eb2f96",
  Errands: "#fa8c16",
  Shopping: "#52c41a",
  Planning: "#1890ff",
  Travel: "#1890ff",
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
  fetchData,
}) => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
    total: data?.meta?.total ?? 0,
  });

  const statusToggle = async (data: DataProps) => {
    if (!data?.id) return;
    try {
      const res = await axios.put(
        generateUrl(`/api/v1/todo/${data?.id}`),
        data
      );
      if (res?.data?.success) {
        message.success("Task status updated successfully");
        fetchData({
          page: pagination?.current,
          perPage: pagination?.pageSize,
        });
      }
    } catch {
      message.error("Failed to update task status");
    }
  };

  const handleDelete = async (data: DataProps) => {
    if (!data?.id) return;
    try {
      const res = await axios.delete(generateUrl(`/api/v1/todo/${data?.id}`));
      if (res?.data?.success) {
        message.success("Task deleted successfully");
        fetchData({
          page: pagination?.current,
          perPage: pagination?.pageSize,
        });
      }
    } catch {
      message.error("Failed to delete task");
    }
  };

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
      render: (text: string) => (text ? dayjs(text).format("DD-MM-YYYY") : "-"),
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
          onClick={() => statusToggle({ ...record, isCompleted: !value })}
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
            onClick={() => handleDelete(record)}
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

  const handleTableChange = (pagination: TablePaginationConfig) => {
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
          <Flex wrap gap={16} align="center">
            <Input.Search
              onSearch={(val) =>
                fetchData({
                  searchText: val,
                  page: pagination?.current,
                  perPage: pagination?.pageSize,
                })
              }
              placeholder="Search task..."
              className="xs:w-full lg:w-1/3"
              allowClear
            />
            <Select
              options={categoryOptions}
              placeholder="Filter by Category"
              allowClear
              onSelect={(val) => {
                fetchData({
                  category: val,
                });
              }}
              onClear={() => {
                fetchData({});
              }}
              className="xs:w-full lg:w-[200px] mx-auto"
            />
            <Select
              options={formatOptions(["Completed", "Incomplete"])}
              placeholder="Filter by Status"
              allowClear
              onSelect={(val) => {
                fetchData({
                  status: val,
                });
              }}
              onClear={() => {
                fetchData({});
              }}
              className="xs:w-full lg:w-[150px] mx-auto"
            />
            <Button
              className="xs:w-full mx-auto flex items-center justify-center"
              type="primary"
              onClick={() => onAdd()}
            >
              <span>Add Task</span>
              <PlusOutlined />
            </Button>
          </Flex>
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
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default TodoList;
