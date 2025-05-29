
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baja';
  status: 'pending' | 'inProgress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  status: 'pending' | 'inProgress' | 'completed';
  color: string;
  tasks: Task[];
}

export type TaskStatus = 'pending' | 'inProgress' | 'completed';
export type Priority = 'alta' | 'media' | 'baja';
