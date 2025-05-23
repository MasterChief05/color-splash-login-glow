
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Calendar, 
  LogOut, 
  GraduationCap, 
  FileText,
  School,
  User
} from "lucide-react";

interface AppSidebarProps {
  username: string;
  role: string;
}

export function AppSidebar({ username, role }: AppSidebarProps) {
  const navigate = useNavigate();

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
            title: "Panel Principal",
            icon: LayoutDashboard,
            url: "/dashboard/admin",
          },
          {
            title: "Gestión de Usuarios",
            icon: Users,
            url: "#",
          },
          {
            title: "Administración Académica",
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
            title: "Tablero Kanban",
            icon: LayoutDashboard,
            url: "/dashboard/profesor",
          },
          {
            title: "Mis Cursos",
            icon: BookOpen,
            url: "#",
          },
          {
            title: "Alumnos",
            icon: Users,
            url: "#",
          },
          {
            title: "Horarios",
            icon: Calendar,
            url: "#",
          },
        ];
      case "alumno":
        return [
          {
            title: "Panel Principal",
            icon: LayoutDashboard,
            url: "/dashboard/alumno",
          },
          {
            title: "Mis Cursos",
            icon: BookOpen,
            url: "#",
          },
          {
            title: "Calificaciones",
            icon: GraduationCap,
            url: "#",
          },
          {
            title: "Horario de Clases",
            icon: Calendar,
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
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <User className="h-8 w-8 text-tecsup" />
          <div>
            <h2 className="text-lg font-bold text-gray-800">Panel {roleLabel}</h2>
            <p className="text-sm text-gray-600">{username}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Cerrar sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
