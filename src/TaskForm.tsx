import React from "react";
import { Form, Input, Button, Select, DatePicker, Switch } from "antd";
import { Task } from "./types";

interface TaskFormProps {
  initialValues: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleFormSubmit = (values: any) => {
    onSubmit({
      id: initialValues.id || Date.now(),
      title: values.title,
      priority: values.priority,
      dueDate: values.dueDate?.format("YYYY-MM-DD"),
      status: values.status ? "Completed" : "Not Completed",
    });
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={handleFormSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Task Title"
        name="title"
        rules={[{ required: true, message: "Please input the task title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Priority" name="priority">
        <Select>
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Due Date" name="dueDate">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Status" name="status" valuePropName="checked">
        <Switch />
      </Form.Item>

      <div style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          {initialValues.id ? "Update" : "Add"} Task
        </Button>
      </div>
    </Form>
  );
};
