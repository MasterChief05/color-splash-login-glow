
import LoginForm from "@/components/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tecsup. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Index;
