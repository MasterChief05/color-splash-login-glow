
import { AppSidebar } from "@/components/AppSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function ProfesorDashboard() {
  const username = localStorage.getItem("username") || "Profesor";

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar username={username} role="profesor" />
      <main className="flex-1 bg-background">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Panel del Profesor
            </h1>
            <p className="text-muted-foreground">
              Bienvenido, {username}. Gestiona tus tareas y proyectos.
            </p>
          </div>
          <KanbanBoard userRole="profesor" />
        </div>
      </main>
    </div>
  );
}
