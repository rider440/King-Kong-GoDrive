import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateLogin = (form: any) => {
  let err: any = {};

  if (!form.username) err.username = "Username required";
  if (!form.password) err.password = "Password required";

  return err;
};