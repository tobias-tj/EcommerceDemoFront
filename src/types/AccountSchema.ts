import { z } from "zod";

// Esquema para el formulario de inicio de sesión
export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(5, "La contraseña debe tener al menos 5 caracteres"),
});

// Esquema para el formulario de registro
export const registerSchema = z
  .object({
    email: z.string().email("Correo electrónico inválido"),
    fullName: z.string().min(1, "El nombre completo es requerido"),
    password: z
      .string()
      .min(5, "La contraseña debe tener al menos 5 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Tipo inferido para el formulario de inicio de sesión
export type LoginFormData = z.infer<typeof loginSchema>;

// Tipo inferido para el formulario de registro
export type RegisterFormData = z.infer<typeof registerSchema>;
