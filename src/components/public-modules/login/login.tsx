import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormModel } from "../../../core/model/login-form.model";
import useAuth from "../../../hooks/auth-hook/use-auth.hook";
import { useValidationRegex } from "../../../hooks/validation-regex-hook/use-validation-regex.hook";
import { generateToken } from "../../../core/utils/token/token-generation.utils";

const Login = () => {
  const { login } = useAuth();
  const redirect = useNavigate();

  const { validateField, errors, setErrors } = useValidationRegex();

  const [loginForm, setLoginForm] = useState<LoginFormModel>({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));

    if (submitted) validateField(name, value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    setErrors({});

    const emailError = validateField("email", loginForm.email);
    const passwordError = validateField("password", loginForm.password);

    if (emailError || passwordError) return;

    try {
      const token = await generateToken(loginForm.email);
      login(token);
      redirect("/dashboard");
    } catch (error) {
      console.error("Error al generar el token", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          name="email"
          value={loginForm.email}
          onChange={handleChange}
          className={`w-full p-2 border text-black ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          className={`w-full p-2 border text-black ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Login;
