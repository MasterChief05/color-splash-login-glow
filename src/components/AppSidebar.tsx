
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  LogOut, 
  GraduationCap, 
  FileText,
  School,
  User,
  Menu
} from "lucide-react";

interface AppSidebarProps {
  username: string;
  role: string;
}

export function AppSidebar({ username, role }: AppSidebarProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    navigate("/");
  };

  // Menú items basado en el rol
  const getMenuItems = () => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Inicio",
            icon: LayoutDashboard,
            url: "/dashboard/admin",
          },
          {
            title: "Usuarios",
            icon: Users,
            url: "#",
          },
          {
            title: "Académica",
            icon: School,
            url: "#",
          },
          {
            title: "Reportes",
            icon: FileText,
            url: "#",
          },
        ];
      case "profesor":
        return [
          {
            title: "Inicio",
            icon: LayoutDashboard,
            url: "/dashboard/profesor",
          },
          {
            title: "Trabajos",
            icon: BookOpen,
            url: "#",
          },
          {
            title: "Proyectos",
            icon: Users,
            url: "#",
          },
          {
            title: "Servicios",
            icon: Calendar,
            url: "#",
          },
        ];
      case "alumno":
        return [
          {
            title: "Inicio",
            icon: LayoutDashboard,
            url: "/dashboard/alumno",
          },
          {
            title: "Trabajos",
            icon: BookOpen,
            url: "#",
          },
          {
            title: "Proyectos",
            icon: GraduationCap,
            url: "#",
          },
          {
            title: "Servicios",
            icon: Calendar,
            url: "#",
          },
          {
            title: "Contacto",
            icon: FileText,
            url: "#",
          },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const roleLabel = role === "admin" ? "Administrador" : role === "profesor" ? "Profesor" : "Alumno";

  return (
    <>
      {/* Sidebar que empuja contenido en web */}
      <div 
        className={`bg-teal-700 text-white transition-all duration-300 ease-in-out ${
          isMobile 
            ? `fixed left-0 top-0 h-full z-50 ${isExpanded ? 'w-64' : 'w-16'}` 
            : `relative h-screen ${isExpanded ? 'w-64' : 'w-16'}`
        }`}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        {/* Header con botón de menú */}
        <div className="flex items-center p-4 border-b border-teal-600">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-teal-600 p-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu size={20} />
          </Button>
          {isExpanded && (
            <span className="ml-3 font-semibold text-lg">Menú</span>
          )}
        </div>

        {/* Información del usuario */}
        {isExpanded && (
          <div className="p-4 border-b border-teal-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{roleLabel}</p>
                <p className="text-xs text-teal-200">{username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menú de navegación */}
        <nav className="flex-1 py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className="flex items-center px-4 py-3 text-white hover:bg-teal-600 transition-colors border-b border-teal-600/30"
            >
              <item.icon size={20} className="min-w-[20px]" />
              {isExpanded && (
                <span className="ml-4 text-sm">{item.title}</span>
              )}
            </a>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-4 border-t border-teal-600">
          <Button 
            variant="ghost" 
            className={`w-full text-white hover:bg-teal-600 transition-colors ${
              isExpanded ? 'justify-start' : 'justify-center'
            }`}
            onClick={handleLogout}
          >
            <LogOut size={20} className="min-w-[20px]" />
            {isExpanded && <span className="ml-4">Cerrar sesión</span>}
          </Button>
        </div>
      </div>

      {/* Overlay para móvil cuando está expandido */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
