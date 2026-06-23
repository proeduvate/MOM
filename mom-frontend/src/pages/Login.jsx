import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = () => {

  const savedUsername =
    localStorage.getItem(
      "registeredUsername"
    );

  const savedEmail =
    localStorage.getItem(
      "registeredEmail"
    );

  const savedPassword =
    localStorage.getItem(
      "registeredPassword"
    );

  if (

    (
      username ===
      savedUsername ||

      username ===
      savedEmail
    )

    &&

    password ===
    savedPassword

  ) {

    localStorage.setItem(
      "username",
      savedUsername
    );

    localStorage.setItem(
      "email",
      savedEmail
    );

    navigate("/dashboard");

  } else {

    alert(
      "Invalid Credentials"
    );

  }

};
  return (

    <div className="flex items-center justify-center min-h-screen bg-[#edf4f1]">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[400px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          MoM Assistant

        </h1>

       <input
          type="text"
          placeholder="admin@example.com / Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

       <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded-xl mb-6"
          />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          Login
        </button>

        <p className="text-center mt-4">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
            className="text-green-600 cursor-pointer ml-2 font-semibold"
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;