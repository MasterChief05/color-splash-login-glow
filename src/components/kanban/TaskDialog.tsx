
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Task, Priority } from "@/types/kanban";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  mode: 'create' | 'edit';
}

export const TaskDialog = ({ open, onOpenChange, task, onSave, mode }: TaskDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'media' as Priority,
    status: 'pending' as const
  });

  useEffect(() => {
    if (task && mode === 'edit') {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'media',
        status: 'pending'
      });
    }
  }, [task, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="focus:border-tecsup"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="focus:border-tecsup"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority">Prioridad</Label>
            <Select value={formData.priority} onValueChange={(value: Priority) => 
              setFormData(prev => ({ ...prev, priority: value }))
            }>
              <SelectTrigger className="focus:border-tecsup">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-tecsup hover:bg-tecsup/90">
              {mode === 'create' ? 'Crear' : 'Guardar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
