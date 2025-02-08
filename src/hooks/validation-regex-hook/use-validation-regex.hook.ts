import { useState } from "react";

export const useValidationRegex = () => {
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name: string, value: string): string | undefined => {
    let error: string | undefined;

    if (!value.trim()) {
      error = `El ${name === "email" ? "email" : "password"} es requerido`;
    } else if (name === "email" && !validateEmail(value)) {
      error = "Correo electrónico no válido";
    } else if (name === "password" && !validatePassword(value)) {
      error =
        "Contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  return {
    errors,
    validateField,
    setErrors,
  };
};
