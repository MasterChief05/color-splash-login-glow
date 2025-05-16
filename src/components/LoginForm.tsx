
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Card className="w-full max-w-md border-tecsup shadow-lg animate-fade-in">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <div className="w-64 h-auto mb-4 animate-float">
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
          Ingresa tu nombre para continuar
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
          <Button 
            type="submit" 
            className="w-full h-12 bg-tecsup hover:bg-tecsup-dark text-white font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
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
