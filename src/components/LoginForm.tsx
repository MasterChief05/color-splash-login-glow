
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Usuarios predefinidos por rol
const USERS = {
  admin: { username: "admin", password: "admin123", role: "admin" },
  profesor: { username: "profesor", password: "profesor123", role: "profesor" },
  alumno: { username: "alumno", password: "alumno123", role: "alumno" }
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre de usuario",
        variant: "destructive",
      });
      return;
    }

    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu contraseña",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Verificar las credenciales
    setTimeout(() => {
      const foundUser = Object.values(USERS).find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        toast({
          title: "¡Bienvenido!",
          description: `Has iniciado sesión como ${foundUser.role}`,
        });
        // Guardar el rol del usuario en localStorage
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("username", username);
        
        // Redirigir al dashboard correspondiente
        navigate(`/dashboard/${foundUser.role}`);
      } else {
        toast({
          title: "Error",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Función de inicio con Google no disponible aún",
    });
  };

  return (
    <Card className="w-full max-w-md border-tecsup shadow-lg animate-fade-in relative z-10">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-64 h-auto mb-4">
          <img 
            src="/lovable-uploads/df7514f5-b607-4a2b-a0f5-3f5ccdba117b.png" 
            alt="Tecsup Logo" 
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-center text-tecsup">
          Bienvenido a Tecsup
        </h1>
        <p className="text-sm text-muted-foreground text-center">
          Ingresa tus datos para continuar
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="username"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-2 border-tecsup/30 focus:border-tecsup pl-10 pr-4"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-tecsup/30 focus:border-tecsup pl-10 pr-12"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" /> : 
                  <Eye className="h-5 w-5" />
                }
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-tecsup hover:bg-tecsup-dark text-white font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
          
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">o</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full h-12 flex items-center justify-center gap-2 border-2 border-gray-300 hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <Mail className="h-5 w-5 text-[#4285F4]" />
            <span>Continuar con Google</span>
          </Button>
        </form>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Credenciales para pruebas:</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Admin:</strong> usuario: admin, contraseña: admin123</p>
            <p><strong>Profesor:</strong> usuario: profesor, contraseña: profesor123</p>
            <p><strong>Alumno:</strong> usuario: alumno, contraseña: alumno123</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2">
          <p className="text-xs text-center text-gray-500">
            TECNOLOGÍA CON SENTIDO
          </p>
        </div>
        <div className="w-full border-t border-gray-200 my-4"></div>
        <Button 
          variant="outline" 
          className="w-full text-tecsup border-tecsup/30 hover:border-tecsup hover:text-tecsup-dark"
          onClick={() => toast({ title: "Registro", description: "Función de registro no disponible aún" })}
        >
          ¿Nuevo usuario? Regístrate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
