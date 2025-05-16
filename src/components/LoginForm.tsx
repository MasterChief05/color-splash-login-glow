
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

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
    // Simulación de login
    setTimeout(() => {
      toast({
        title: "¡Bienvenido!",
        description: `Has iniciado sesión como ${username}`,
      });
      setIsLoading(false);
      // Aquí podríamos redirigir al usuario a otra página
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
            <Input
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 border-2 border-tecsup/30 focus:border-tecsup px-4"
              required
            />
          </div>
          
          <div className="space-y-2 relative">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-tecsup/30 focus:border-tecsup pl-10 pr-12"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
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
