
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Column, Task } from "@/types/kanban";
import { TaskCard } from "./TaskCard";

interface KanbanColumnProps {
  column: Column;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const KanbanColumn = ({ column, onAddTask, onEditTask, onDeleteTask }: KanbanColumnProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-tecsup';
      case 'inProgress': return 'bg-tecsup-contrast';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(column.status)}`}></div>
          {column.title} ({column.tasks.length})
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onAddTask}
          className="hover:bg-tecsup/10 hover:text-tecsup"
        >
          <Plus size={16} />
        </Button>
      </div>
      <div className="space-y-2">
        {column.tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
