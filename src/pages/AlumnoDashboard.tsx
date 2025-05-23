import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BookOpen, GraduationCap, Calendar, LayoutDashboard } from "lucide-react";

const AlumnoDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene el rol correcto
    const role = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    
    if (role !== "alumno") {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar username={username} role="alumno" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <LayoutDashboard size={24} className="text-tecsup" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Panel de Alumno</h1>
                <p className="text-sm text-gray-600">Bienvenido, {username}</p>
              </div>
            </div>
          </header>
          
          <div className="flex-grow p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-tecsup/10 pb-2">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <BookOpen size={20} />
                      Mis Cursos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Accede a los cursos en los que estás matriculado.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Cursos activos: 5</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Ver cursos</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-tecsup/10 pb-2">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <GraduationCap size={20} />
                      Calificaciones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Revisa tus calificaciones y progreso académico.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Promedio actual: 16.5</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Ver detalle</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-tecsup/10 pb-2">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <Calendar size={20} />
                      Horario de Clases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Consulta tu calendario académico y horarios.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Próximas clases: 2</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Ver horario</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AlumnoDashboard;
