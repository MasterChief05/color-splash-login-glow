
import LoginForm from "@/components/LoginForm";
import { useEffect, useState } from "react";

// Componente para las gotas de lluvia
const RainDrop = ({ style }: { style: React.CSSProperties }) => {
  return (
    <div
      className="absolute bg-tecsup/20 rounded-full animate-fall pointer-events-none"
      style={style}
    ></div>
  );
};

const Index = () => {
  const [raindrops, setRaindrops] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Crear gotas de lluvia iniciales
    const initialDrops = Array.from({ length: 50 }, () => createRaindropStyle());
    setRaindrops(initialDrops);
    
    // Crear nuevas gotas periódicamente
    const interval = setInterval(() => {
      setRaindrops(prev => {
        // Eliminar algunas gotas antiguas si hay demasiadas
        const filtered = prev.length > 100 ? prev.slice(-80) : prev;
        // Agregar nuevas gotas
        return [...filtered, createRaindropStyle()];
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Función para crear el estilo de una gota de lluvia
  const createRaindropStyle = (): React.CSSProperties => {
    const size = Math.random() * 20 + 5; // Entre 5px y 25px
    const left = Math.random() * 100; // Posición horizontal (0-100%)
    const duration = Math.random() * 3 + 2; // Entre 2 y 5 segundos
    const delay = Math.random() * 2; // Retraso entre 0 y 2 segundos
    const opacity = Math.random() * 0.6 + 0.2; // Opacidad entre 0.2 y 0.8

    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: "-20px",
      opacity,
      animation: `fall ${duration}s linear ${delay}s infinite`,
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 p-4 relative overflow-hidden">
      {/* Gotas de lluvia */}
      {raindrops.map((style, index) => (
        <RainDrop key={index} style={style} />
      ))}
      
      <div className="w-full max-w-md relative z-10">
        <LoginForm />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} Tecsup. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Index;
