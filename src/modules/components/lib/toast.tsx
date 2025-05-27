// Componentes Terceiros
import { toast, ToastOptions } from "react-toastify";

type ToastType = "success" | "error" | "info";

export default function Toast(type: ToastType, message: string): void {
  const params: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "success":
      toast.success(message, params);
      break;
    case "error":
      toast.error(message, params);
      break;
    case "info":
      toast.info(message, params);
      break;
    default:
      break;
  }
}
