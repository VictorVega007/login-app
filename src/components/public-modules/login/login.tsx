import { useState } from "react";
import { LoginFormModel } from "../../../core/model/login-form.model";
import useAuth from "../../../hooks/auth-hook/use-auth.hook";
import { useValidationRegex } from "../../../hooks/validation-regex-hook/use-validation-regex.hook";
import { generateToken } from "../../../core/utils/token/token-generation.utils";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

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

      setTimeout(() => {
        redirect("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error al generar el token", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen background-radial-gradient p-4 overflow-hidden">
      <div className="w-full max-w-md bg-glass p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <LogIn size={48} className="text-purple-600" />
        </div>
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Ingrese su email"
              value={loginForm.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-white text-black border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={loginForm.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg bg-white text-black border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition font-semibold shadow-md"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
