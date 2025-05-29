
import { AppSidebar } from "@/components/AppSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

export default function AdminDashboard() {
  const username = localStorage.getItem("username") || "Administrador";

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar username={username} role="admin" />
      <main className="flex-1 bg-background">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Bienvenido, {username}. Controla y supervisa el sistema.
            </p>
          </div>
          <KanbanBoard userRole="admin" />
        </div>
      </main>
    </div>
  );
}
