import { Form, Modal } from "antd"
import { FC } from "react";
import { TodoModalProps } from "../types";

const TodoModal: FC<TodoModalProps> = ({ ...restProps }) => {
  return (
    <Modal {...restProps}>
      <Form>
      </Form>
    </Modal>
  )
};

export default TodoModal;