import { useState, useContext } from "react";
import { signIn, signInWithGithub } from "../service/supabase";
import github from "../assets/github.svg";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { isEmail, isPasswordValid } from "../utils/strings";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const { user, setUser, saveUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const handleInputsChange = (event) => {
    const { value, name } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = inputs;

    if (!isEmail(email) || !isPasswordValid(password)) {
      setIsValidEmail(!isEmail(email));
      setIsValidPassword(!isPasswordValid(password));
      return;
    }

    setIsValidEmail(false);
    setIsValidPassword(false);

    const user = await signIn(inputs);

    if (!user.ok) {
      Swal.fire({
        text: user.error.message,
        icon: "error",
      });
      return;
    }

    saveUser(user.data.user);

    setUser(user.data.user);
  };

  if(user) return navigate("/");

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gray-200">
        <div className="artboard-demo phone-2 p-6">
          <h1 className="text-2xl">Iniciar sesión con un email</h1>
          <p className="mt-6 text-gray-900 font-light">
            Ingrese una dirección email asociada a su cuenta
          </p>
          <form onSubmit={handleSubmit} className="mt-10 w-full" noValidate>
            <div>
              <input
                type="email"
                value={inputs.email}
                name="email"
                onChange={handleInputsChange}
                placeholder="Ingrese su email"
                className={`border ${
                  isValidEmail ? "border-red-500" : "border-gray-300 "
                }  rounded-lg p-3 w-full bg-gray-50`}
              />
              {isValidEmail && (
                <span className="text-red-500 mt-2 text-sm">
                  Ingresa un correo valido
                </span>
              )}
            </div>
            <div className="mt-6">
              <input
                type="password"
                value={inputs.password}
                name="password"
                onChange={handleInputsChange}
                placeholder="Ingrese su password"
                className={`border ${
                  isValidPassword ? "border-blue-500" : "border-gray-300"
                }   rounded-lg p-3 w-full bg-gray-50`}
              />
              {isValidPassword && (
                <span className="text-red-500 mt-2 text-sm">
                  Ingresa un password valido
                </span>
              )}
            </div>
            <div className="mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Iniciar sesión
              </button>
            </div>
            <div className="mt-6 text-center">
              <span>
                Eres nuevo?{" "}
                <Link className="text-blue-600" to={"/signup"}>
                  Regístrate
                </Link>{" "}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
