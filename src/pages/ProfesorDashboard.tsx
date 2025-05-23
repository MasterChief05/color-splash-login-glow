import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BookOpen, Users, Calendar, CheckCircle, Clock, LayoutDashboard } from "lucide-react";

// Tipo para las tarjetas de tareas
type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  status: "pendiente" | "en-progreso" | "completada";
};

const ProfesorDashboard = () => {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Preparar material para clase de Programación",
      description: "Crear presentación y ejemplos de código para la clase del lunes",
      dueDate: "2025-05-27",
      priority: "alta",
      status: "pendiente"
    },
    {
      id: "2",
      title: "Revisar proyectos finales",
      description: "Calificar los proyectos de los alumnos de Diseño Web",
      dueDate: "2025-05-29",
      priority: "alta",
      status: "pendiente"
    },
    {
      id: "3",
      title: "Reunión de departamento",
      description: "Asistir a la reunión mensual del departamento de tecnología",
      dueDate: "2025-05-30",
      priority: "media",
      status: "pendiente"
    },
    {
      id: "4",
      title: "Actualizar syllabus",
      description: "Actualizar el contenido del curso para el próximo semestre",
      dueDate: "2025-06-10",
      priority: "baja",
      status: "en-progreso"
    },
    {
      id: "5",
      title: "Revisar exámenes parciales",
      description: "Calificar exámenes de la materia de Bases de Datos",
      dueDate: "2025-05-25",
      priority: "alta",
      status: "en-progreso"
    },
    {
      id: "6",
      title: "Preparar laboratorio",
      description: "Configurar las máquinas para la práctica de redes",
      dueDate: "2025-05-24",
      priority: "media",
      status: "completada"
    }
  ]);
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

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityClass = (priority: Task["priority"]) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "baja":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar username={username} role="profesor" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <LayoutDashboard size={24} className="text-tecsup" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Panel de Profesor</h1>
                <p className="text-sm text-gray-600">Bienvenido, {username}</p>
              </div>
            </div>
          </header>
          
          <div className="flex-grow p-6">
            <div className="max-w-7xl mx-auto">
              <Tabs defaultValue="tareas" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="tareas" className="flex items-center gap-2">
                    <LayoutDashboard size={16} />
                    Tablero Kanban
                  </TabsTrigger>
                  <TabsTrigger value="cursos" className="flex items-center gap-2">
                    <BookOpen size={16} />
                    Mis Cursos
                  </TabsTrigger>
                  <TabsTrigger value="alumnos" className="flex items-center gap-2">
                    <Users size={16} />
                    Alumnos
                  </TabsTrigger>
                  <TabsTrigger value="horario" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Horarios
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tareas" className="mt-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Columna Pendiente */}
                    <div className="flex-1 bg-gray-100 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-4 text-gray-700 font-medium">
                        <Clock size={18} />
                        <h3>Pendientes</h3>
                        <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {getTasksByStatus("pendiente").length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {getTasksByStatus("pendiente").map((task) => (
                          <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-sm font-medium text-gray-800">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                            </CardContent>
                            <CardFooter className="py-2 px-4 flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Vence: {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                                {task.priority}
                              </span>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full mt-3 border border-dashed border-gray-300 text-gray-500 hover:text-gray-700">
                        + Agregar tarea
                      </Button>
                    </div>

                    {/* Columna En Progreso */}
                    <div className="flex-1 bg-gray-100 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-4 text-blue-700 font-medium">
                        <Clock size={18} className="text-blue-600" />
                        <h3>En Progreso</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {getTasksByStatus("en-progreso").length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {getTasksByStatus("en-progreso").map((task) => (
                          <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-sm font-medium text-gray-800">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                            </CardContent>
                            <CardFooter className="py-2 px-4 flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Vence: {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                                {task.priority}
                              </span>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full mt-3 border border-dashed border-gray-300 text-gray-500 hover:text-gray-700">
                        + Agregar tarea
                      </Button>
                    </div>

                    {/* Columna Completada */}
                    <div className="flex-1 bg-gray-100 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-4 text-green-700 font-medium">
                        <CheckCircle size={18} className="text-green-600" />
                        <h3>Completadas</h3>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {getTasksByStatus("completada").length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {getTasksByStatus("completada").map((task) => (
                          <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader className="py-3 px-4">
                              <CardTitle className="text-sm font-medium text-gray-800">{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2 px-4">
                              <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                            </CardContent>
                            <CardFooter className="py-2 px-4 flex justify-between items-center">
                              <span className="text-xs text-gray-500">
                                Completada
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                                {task.priority}
                              </span>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      <Button variant="ghost" className="w-full mt-3 border border-dashed border-gray-300 text-gray-500 hover:text-gray-700">
                        + Agregar tarea
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cursos">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-tecsup/10 pb-2">
                        <CardTitle className="flex items-center gap-2 text-tecsup">
                          <BookOpen size={20} />
                          Mis Cursos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 mb-4">Administra los cursos que estás enseñando actualmente.</p>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Cursos activos: 4</span>
                          <Button variant="link" className="p-0 h-auto text-tecsup">Ver cursos</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="alumnos">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-tecsup/10 pb-2">
                        <CardTitle className="flex items-center gap-2 text-tecsup">
                          <Users size={20} />
                          Alumnos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 mb-4">Gestiona a tus estudiantes y sus calificaciones.</p>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Total alumnos: 87</span>
                          <Button variant="link" className="p-0 h-auto text-tecsup">Ver alumnos</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="horario">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                      <CardHeader className="bg-tecsup/10 pb-2">
                        <CardTitle className="flex items-center gap-2 text-tecsup">
                          <Calendar size={20} />
                          Horarios
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 mb-4">Consulta tu calendario de clases y actividades.</p>
                        <div className="flex justify-between text-sm font-medium">
                          <span>Próximas clases: 3</span>
                          <Button variant="link" className="p-0 h-auto text-tecsup">Ver horario</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProfesorDashboard;
