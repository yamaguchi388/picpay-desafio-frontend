export interface IToast {
  type?: "success" | "error" | "warning" | "info";
  message?: string;
  id?: string;
}
