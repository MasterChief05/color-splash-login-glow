import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { User, Users, BookOpen, School, FileText, LayoutDashboard } from "lucide-react";

const AdminDashboard = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario tiene el rol correcto
    const role = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    
    if (role !== "admin") {
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
        <AppSidebar username={username} role="admin" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <LayoutDashboard size={24} className="text-tecsup" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Panel de Administrador</h1>
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
                      <Users size={20} />
                      Gestión de Usuarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Administra profesores y estudiantes en la plataforma.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Usuarios: 256</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Gestionar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-tecsup/10 pb-2">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <School size={20} />
                      Administración Académica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Gestiona carreras, cursos y programas académicos.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Carreras: 12</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Gestionar</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-tecsup/10 pb-2">
                    <CardTitle className="flex items-center gap-2 text-tecsup">
                      <FileText size={20} />
                      Reportes del Sistema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600 mb-4">Accede a estadísticas y reportes detallados.</p>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Reportes disponibles: 8</span>
                      <Button variant="link" className="p-0 h-auto text-tecsup">Ver reportes</Button>
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

export default AdminDashboard;
