
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/AppSidebar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { Calendar, Users, BookOpen, LayoutDashboard } from "lucide-react";

const ProfesorDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    
    if (role !== "profesor") {
      navigate("/");
      return;
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AppSidebar username={username} role="profesor" />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={24} className="text-tecsup" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Tablero Kanban - Profesor</h1>
              <p className="text-sm text-gray-600">Bienvenido, {username}</p>
            </div>
          </div>
        </header>

        <div className="p-6 flex-1">
          <Tabs defaultValue="kanban" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-tecsup/10">
              <TabsTrigger value="kanban" className="data-[state=active]:bg-tecsup data-[state=active]:text-white">
                Tablero Kanban
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-tecsup data-[state=active]:text-white">
                Mis Cursos
              </TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-tecsup data-[state=active]:text-white">
                Estudiantes
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-tecsup data-[state=active]:text-white">
                Horarios
              </TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="mt-6">
              <KanbanBoard userRole="profesor" />
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-tecsup">
                  <CardHeader className="bg-tecsup/5">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <BookOpen size={20} />
                      Programación Web
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600">30 estudiantes matriculados</p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-tecsup">
                  <CardHeader className="bg-tecsup/5">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <BookOpen size={20} />
                      Base de Datos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600">25 estudiantes matriculados</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <Card className="border-l-4 border-l-tecsup">
                <CardHeader className="bg-tecsup/5">
                  <CardTitle className="flex items-center gap-2 text-tecsup">
                    <Users size={20} />
                    Lista de Estudiantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600">Gestiona la información de tus estudiantes</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card className="border-l-4 border-l-tecsup">
                <CardHeader className="bg-tecsup/5">
                  <CardTitle className="flex items-center gap-2 text-tecsup">
                    <Calendar size={20} />
                    Horario de Clases
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-600">Consulta tu horario semanal</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfesorDashboard;
