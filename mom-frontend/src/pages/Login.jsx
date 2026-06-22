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

    if (
      password ===
      "1122334455"
    ) {

     const displayName =
        username.includes("@")
            ? username.split("@")[0]
            : username;

        localStorage.setItem(
        "username",
        displayName
        );

        localStorage.setItem(
        "email",
        username
        );

      navigate("/Dashboard");

    } else {

      alert(
        "Invalid Password"
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
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-6"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;