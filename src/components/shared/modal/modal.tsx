import { Loader } from "lucide-react";
import "./modal.css";

const Modal = ({ isOpen, message }: { isOpen: boolean; message: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-screen background-radial-gradient px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="flex items-center justify-center mb-4">
          <Loader size={50} className="animate-spin text-blue-500" />
        </div>
        <p className="text-lg font-semibold text-center text-blue-950">
          {message}
        </p>
        <p className="text-lg font-semibold text-center text-blue-950 mt-5">
          No cierres el navegador, estás siendo redirigido
        </p>
      </div>
    </div>
  );
};

export default Modal;
