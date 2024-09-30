import { FC, useEffect } from "react";
import { Form, Modal, Input, DatePicker, Button, Flex, Divider } from "antd";
import dayjs from "dayjs";
import { TodoModalProps } from "../types";

const INITIAL_VALUES = {
  title: "",
  date: "",
  category: "",
};

const TodoModal: FC<TodoModalProps> = ({ open, data, ...restProps }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && Object.keys(data)?.length) {
      form.setFieldsValue(data);
    }
  }, [open]);

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal centered footer={null} {...restProps}>
      <Form
        form={form}
        name="myForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={INITIAL_VALUES}
      >
        <Form.Item
          label="Task Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please fill task title!",
            },
          ]}
        >
          <Input placeholder="Enter the title" />
        </Form.Item>
        <Form.Item
          label="Task Date"
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
        <Form.Item
          label="Task Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please fill task category!",
            },
          ]}
        >
          <Input placeholder="Enter the category" />
        </Form.Item>
        <Divider />
        <Flex gap={8} justify="flex-end" align="center">
          <Button type="text" htmlType="submit">
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
