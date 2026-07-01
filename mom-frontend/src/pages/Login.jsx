
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const navigate = useNavigate();
const loginLock = useRef(false);

const handleLogin = async () => {
  //  HARD BLOCK (instant, no React delay issue)
  if (loginLock.current) return;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  loginLock.current = true;
  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:8000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      }
    );

    const data = await response.json();

  if (response.ok) {
  alert("Login Successful");

  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
  localStorage.setItem("token", data.token);   // <-- ADD THIS

  setTimeout(() => {
    navigate("/dashboard");
  }, 300);
  } else {
      alert(data.detail || "Invalid Credentials");
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");

  } finally {
    setLoading(false);
    loginLock.current = false; // unlock
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
          placeholder="Email / Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 rounded-xl text-white ${
            loading ? "bg-gray-400" : "bg-green-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4">
          Don't have an account?

          <span
            onClick={() => navigate("/register")}
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