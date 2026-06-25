import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
const registerLock = useRef(false);

const handleRegister = async () => {
  // 🔒 HARD BLOCK (instant, no delay issue)
  if (registerLock.current) return;

  if (!username || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  registerLock.current = true;
  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:8000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful");

      localStorage.setItem("username", username);
      localStorage.setItem("email", email);

      setTimeout(() => {
        navigate("/dashboard");
      }, 300);
    } else {
      alert(data.detail || "Registration Failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");

  } finally {
    setLoading(false);
    registerLock.current = false; // unlock
  }
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
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full p-3 rounded-xl text-white ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  );
}

export default Register;