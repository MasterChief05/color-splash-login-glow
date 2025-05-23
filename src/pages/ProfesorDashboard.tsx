
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppSidebar } from "@/components/AppSidebar";
import { Plus, MoreHorizontal, Calendar, Users, BookOpen, LayoutDashboard } from "lucide-react";

const ProfesorDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene el rol correcto
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

  const tasks = {
    pending: [
      { id: 1, title: "Revisar exámenes finales", description: "Calificar 30 exámenes de Programación Web", priority: "alta" },
      { id: 2, title: "Preparar clase de React", description: "Crear presentación sobre hooks", priority: "media" },
    ],
    inProgress: [
      { id: 3, title: "Proyecto final estudiantes", description: "Supervisar desarrollo de aplicaciones", priority: "alta" },
      { id: 4, title: "Actualizar syllabus", description: "Incluir nuevas tecnologías", priority: "baja" },
    ],
    completed: [
      { id: 5, title: "Reunión con coordinador", description: "Planificación semestre 2024-1", priority: "media" },
      { id: 6, title: "Capacitación Docker", description: "Curso de contenedores", priority: "baja" },
    ]
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal size={12} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 mb-2">{task.description}</p>
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${
            task.priority === 'alta' ? 'bg-red-100 text-red-700' :
            task.priority === 'media' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar username={username} role="profesor" />
      
      {/* Contenido principal con margen izquierdo para el sidebar */}
      <div className="ml-16 transition-all duration-300">
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

        {/* Contenido principal */}
        <div className="p-6">
          <Tabs defaultValue="kanban" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="kanban">Tablero Kanban</TabsTrigger>
              <TabsTrigger value="courses">Mis Cursos</TabsTrigger>
              <TabsTrigger value="students">Estudiantes</TabsTrigger>
              <TabsTrigger value="schedule">Horarios</TabsTrigger>
            </TabsList>

            <TabsContent value="kanban" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Columna Pendientes */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      Pendientes ({tasks.pending.length})
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  {tasks.pending.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>

                {/* Columna En Progreso */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      En Progreso ({tasks.inProgress.length})
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  {tasks.inProgress.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>

                {/* Columna Completadas */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      Completadas ({tasks.completed.length})
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Plus size={16} />
                    </Button>
                  </div>
                  {tasks.completed.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen size={20} />
                      Programación Web
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">30 estudiantes matriculados</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen size={20} />
                      Base de Datos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">25 estudiantes matriculados</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users size={20} />
                    Lista de Estudiantes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Gestiona la información de tus estudiantes</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} />
                    Horario de Clases
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
