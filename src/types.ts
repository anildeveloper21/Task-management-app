export interface Task {
    id: number;
    title: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
    status: "Completed" | "Not Completed";
  }
  