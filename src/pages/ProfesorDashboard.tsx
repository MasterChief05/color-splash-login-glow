
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Calendar, FileText, LogOut } from "lucide-react";

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

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Panel de Profesor</h1>
            <p className="text-gray-600">Bienvenido, {username}</p>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar sesión
          </Button>
        </div>
        
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
      </div>
    </div>
  );
};

export default ProfesorDashboard;
