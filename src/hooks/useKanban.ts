
import { useState } from 'react';
import { Task, Column, TaskStatus } from '@/types/kanban';

export const useKanban = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'pending',
      title: 'Pendientes',
      status: 'pending',
      color: 'bg-tecsup',
      tasks: [
        {
          id: '1',
          title: 'Revisar exámenes finales',
          description: 'Calificar 30 exámenes de Programación Web',
          priority: 'alta',
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      id: 'inProgress',
      title: 'En Progreso',
      status: 'inProgress',
      color: 'bg-tecsup-contrast',
      tasks: [
        {
          id: '2',
          title: 'Proyecto final estudiantes',
          description: 'Supervisar desarrollo de aplicaciones',
          priority: 'alta',
          status: 'inProgress',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completadas',
      status: 'completed',
      color: 'bg-green-500',
      tasks: [
        {
          id: '3',
          title: 'Reunión con coordinador',
          description: 'Planificación semestre 2024-1',
          priority: 'media',
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    }
  ]);

  const createTask = (columnId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.map(task => 
        task.id === taskId 
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    })));
  };

  const deleteTask = (taskId: string) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId)
    })));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    const task = columns.flatMap(col => col.tasks).find(t => t.id === taskId);
    if (!task) return;

    deleteTask(taskId);
    createTask(newStatus, { ...task, status: newStatus });
  };

  return {
    columns,
    createTask,
    updateTask,
    deleteTask,
    moveTask
  };
};
