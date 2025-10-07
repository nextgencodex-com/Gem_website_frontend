import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "gemSite@123" && password === "gemSite@1234") {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-xs" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-6 text-center text-[#bf9b30]">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 border rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 mb-2 text-center">{error}</div>}
        <div className="flex flex-col items-center justify-center sm:flex-row gap-1 pt-0">
        <button
          type="submit"
          className="w-40 bg-[#bf9b30]  text-white text-sm py-1 px-1 rounded-full transition-colors duration-300"
        >
          Login
        </button>
        </div>
      </form>
    </div>
  );
}