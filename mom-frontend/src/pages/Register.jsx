import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleRegister = () => {

    if (
      !username ||
      !email ||
      !password
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    localStorage.setItem(
      "registeredUsername",
      username
    );

    localStorage.setItem(
      "registeredEmail",
      email
    );

    localStorage.setItem(
      "registeredPassword",
      password
    );

    alert(
      "Registration Successful"
    );

    navigate("/");

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-[#edf4f1]">

      <div className="bg-white p-10 rounded-3xl shadow-lg w-[450px]">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 text-white p-3 rounded-xl"
        >
          Register
        </button>

      </div>

    </div>

  );

}

export default Register;