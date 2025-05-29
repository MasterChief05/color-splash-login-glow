
import { AppSidebar } from "@/components/AppSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function AlumnoDashboard() {
  const username = localStorage.getItem("username") || "Alumno";

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar username={username} role="alumno" />
      <main className="flex-1 bg-background">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Panel del Alumno
            </h1>
            <p className="text-muted-foreground">
              Bienvenido, {username}. Organiza tus trabajos y proyectos.
            </p>
          </div>
          <KanbanBoard userRole="alumno" />
        </div>
      </main>
    </div>
  );
}
