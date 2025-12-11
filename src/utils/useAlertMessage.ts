import Swal from "sweetalert2";

interface AlertOptions {
  icon?: "success" | "error" | "warning" | "info";
  title?: string;
  html?: string;
  confirmButtonText?: string;
  confirmButtonColor?: string;
  width?: string;
  padding?: string;
}

export const useAlertMessage = (options: AlertOptions) => {
  return Swal.fire({
    icon: options.icon || "info",
    title: options.title || "",
    html: options.html || "",
    confirmButtonText: options.confirmButtonText || "OK",
    confirmButtonColor: options.confirmButtonColor || "#dc3545",
    width: options.width || "400px",
    padding: options.padding || "1.5rem",
  });
};
