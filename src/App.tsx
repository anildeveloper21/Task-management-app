import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, notification } from "antd";
import { TaskForm } from "./TaskForm";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Fetch tasks from the API
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setTasks(response.data); // Mock data
    });
  }, []);

  const handleAddTask = () => {
    setIsModalVisible(true);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setIsModalVisible(true);
    setEditingTask(task);
  };

  const handleDeleteTask = (id: number) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      notification.success({ message: "Task deleted successfully!" });
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (task: Task) => {
    if (editingTask) {
      // Update task
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${editingTask.id}`, task)
        .then(() => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === task.id ? task : t))
          );
          notification.success({ message: "Task updated successfully!" });
        });
    } else {
      // Add new task
      axios
        .post("https://jsonplaceholder.typicode.com/posts", task)
        .then((response) => {
          setTasks((prevTasks) => [...prevTasks, response.data]);
          notification.success({ message: "Task added successfully!" });
        });
    }

    setIsModalVisible(false);
  };

  const columns = [
    { title: "Task Title", dataIndex: "title" },
    { title: "Priority", dataIndex: "priority" },
    { title: "Due Date", dataIndex: "dueDate" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Actions",
      render: (text: any, task: Task) => (
        <>
          <Button onClick={() => handleEditTask(task)}>Edit</Button>
          <Button onClick={() => handleDeleteTask(task.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
    <h2>Task management app</h2>
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />
      <Modal
        title={editingTask ? "Edit Task" : "Add Task"}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <TaskForm
          initialValues={editingTask || {}}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default App;
