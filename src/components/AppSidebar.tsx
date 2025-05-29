
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
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

  return (
    <>
      {/* Sidebar minimalista */}
      <div 
        className={`bg-tecsup text-white transition-all duration-300 ease-in-out ${
          isMobile 
            ? `fixed left-0 top-0 h-full z-50 ${isExpanded ? 'w-64' : 'w-16'}` 
            : `relative h-screen w-16`
        }`}
      >
        {/* Header con toggle */}
        <div className="flex flex-col items-center p-3 border-b border-tecsup-light/30">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-tecsup-light/20 p-2 mb-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu size={18} />
          </Button>
          <ThemeToggle />
        </div>

        {/* Información del usuario (solo en móvil expandido) */}
        {isMobile && isExpanded && (
          <div className="p-4 border-b border-tecsup-light/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-tecsup-light/30 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <div>
                <p className="font-medium text-sm">{role === "admin" ? "Admin" : role === "profesor" ? "Profesor" : "Alumno"}</p>
                <p className="text-xs text-tecsup-light">{username}</p>
              </div>
            </div>
          </div>
        )}

        {/* Menú de navegación */}
        <nav className="flex-1 py-4">
          {menuItems.map((item, index) => (
            <div key={index} className="px-2 mb-2">
              <a
                href={item.url}
                className="flex items-center justify-center w-12 h-12 text-white hover:bg-tecsup-light/20 transition-colors rounded-lg group relative"
                title={item.title}
              >
                <item.icon size={20} />
                {isMobile && isExpanded && (
                  <span className="ml-4 text-sm absolute left-12 whitespace-nowrap">{item.title}</span>
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-2 border-t border-tecsup-light/30">
          <Button 
            variant="ghost" 
            className="w-12 h-12 text-white hover:bg-tecsup-light/20 transition-colors rounded-lg"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            <LogOut size={20} />
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
