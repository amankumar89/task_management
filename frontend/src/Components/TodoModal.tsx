import { FC, useEffect } from "react";
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Button,
  Flex,
  Divider,
  Select,
  message,
} from "antd";
import dayjs from "dayjs";
import { DataProps, TodoModalProps } from "../types";

const CATEGORY_LISTS = [
  { value: "work", label: "Work" },
  { value: "personal_development", label: "Personal Development" },
  { value: "fitness", label: "Fitness" },
  { value: "household", label: "Household Chores" },
  { value: "social", label: "Social" },
  { value: "finance", label: "Finance & Budgeting" },
  { value: "hobbies", label: "Hobbies" },
  { value: "self_care", label: "Self-care" },
  { value: "errands", label: "Errands" },
  { value: "shopping", label: "Shopping" },
  { value: "travel", label: "Travel & Planning" },
  { value: "learning", label: "Learning" },
  { value: "health", label: "Health" },
  { value: "other", label: "Other" },
];

const INITIAL_VALUES = {
  id: null,
  title: null,
  date: null,
  category: null,
  isCompleted: false,
};

const TodoModal: FC<TodoModalProps> = ({
  open,
  data,
  onSave,
  ...restProps
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && data && Object.keys(data)?.length) {
      form.setFieldsValue({
        ...INITIAL_VALUES,
        ...(data ?? {}),
        date: dayjs(data?.date),
      });
    } else {
      form.resetFields();
    }
  }, [open, data, form]);

  const onFinish = (values: DataProps) => {
    onSave({
      ...values,
      date: dayjs(values?.date)?.format("YYYY-MM-DD"),
      isCompleted: false,
    });
  };

  const onFinishFailed = () => {
    message.error("Please fill required fields!");
  };

  return (
    <Modal open={open} centered title="Add Task" footer={null} {...restProps}>
      <Form
        form={form}
        name="task-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={INITIAL_VALUES}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please fill task title!",
            },
          ]}
        >
          <Input placeholder="Enter the task title..." />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please select task category!",
            },
          ]}
        >
          <Select
            allowClear
            placeholder="Select Task Category"
            options={CATEGORY_LISTS}
          />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select a task date!",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Divider />
        <Flex gap={8} justify="flex-end" align="center">
          <Button type="text" htmlType="reset">
            Reset
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

export default TodoModal;
