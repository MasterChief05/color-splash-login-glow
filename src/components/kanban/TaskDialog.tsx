
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Task, Priority, TaskStatus } from "@/types/kanban";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  mode: 'create' | 'edit';
}

export const TaskDialog = ({ open, onOpenChange, task, onSave, mode }: TaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [status, setStatus] = useState<TaskStatus>("pending");

  useEffect(() => {
    if (task && mode === 'edit') {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
    } else {
      setTitle("");
      setDescription("");
      setPriority("media");
      setStatus("pending");
    }
  }, [task, mode, open]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title,
      description,
      priority,
      status,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-tecsup">
            {mode === 'create' ? 'Crear Nueva Tarea' : 'Editar Tarea'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la tarea"
              className="focus:ring-tecsup focus:border-tecsup"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción de la tarea"
              className="focus:ring-tecsup focus:border-tecsup"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Prioridad</Label>
            <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
              <SelectTrigger className="focus:ring-tecsup focus:border-tecsup">
                <SelectValue placeholder="Selecciona una prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={status} onValueChange={(value: TaskStatus) => setStatus(value)}>
              <SelectTrigger className="focus:ring-tecsup focus:border-tecsup">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="inProgress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-tecsup hover:bg-tecsup-dark text-white">
            {mode === 'create' ? 'Crear' : 'Guardar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
