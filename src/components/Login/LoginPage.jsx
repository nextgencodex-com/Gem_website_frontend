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
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* ========== DESKTOP VIEW CODE ========== */}
      <div className="hidden md:block w-full">
        <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between gap-20">
            {/* Left Section - Logo & Branding - Desktop */}
            <div className="w-1/2 text-left">
              <div className="flex justify-start mb-8">
                <div className="relative">
                  <div className="absolute -inset-6 bg-white/10 rounded-full blur"></div>
                  <div className="relative bg-[#1a1a1a] p-6 rounded-full shadow-2xl ring-1 ring-white/20">
                    <img
                      src="/images/Log 1.webp"
                      alt="Luxury Gemstones"
                      className="w-44 h-44 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <h1 className="font-serif text-5xl text-white font-bold mb-3">
                Admin<span className="text-white/60">Panel</span>
              </h1>
              
              <p className="text-gray-400 text-xl max-w-md">
                Secure access for administrators only
              </p>
            </div>

            {/* Right Section - Login Form - Desktop */}
            <div className="w-1/2 max-w-md">
              <form 
                className="bg-[#1a1a1a] p-8 rounded-xl shadow-2xl border border-white/10" 
                onSubmit={handleLogin}
              >
                <h2 className="font-serif text-xl font-bold mb-6 text-center text-white">
                  Sign In
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full p-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <p className="text-white/70 text-sm text-center">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col items-center pt-4">
                    <button
                      type="submit"
                      className="w-40 bg-white text-black font-semibold text-sm py-3 px-1 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-gray-200"
                    >
                      LOGIN
                    </button>
                  </div>

                  <p className="text-center text-gray-600 text-xs mt-6">
                    This area is restricted to authorized personnel only.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MOBILE VIEW CODE ========== */}
      <div className="block md:hidden w-full">
        <div className="relative z-10 w-full max-w-sm mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Logo - Mobile - Centered and Smaller */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/10 rounded-full blur"></div>
                  <div className="relative bg-[#1a1a1a] p-4 rounded-full shadow-2xl ring-1 ring-white/20">
                    <img
                      src="/images/Log 1.webp"
                      alt="Luxury Gemstones"
                      className="w-28 h-28 object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <h1 className="font-serif text-3xl text-white font-bold mb-1">
                Admin<span className="text-white/60">Panel</span>
              </h1>
              
              <p className="text-gray-400 text-sm max-w-xs mx-auto">
                Secure access for administrators only
              </p>
            </div>

            {/* Login Form - Mobile */}
            <div className="w-full">
              <form 
                className="bg-[#1a1a1a] p-6 rounded-xl shadow-2xl border border-white/10" 
                onSubmit={handleLogin}
              >
                <h2 className="font-serif text-lg font-bold mb-5 text-center text-white">
                  Sign In
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full p-2.5 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full p-2.5 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <p className="text-white/70 text-xs text-center">{error}</p>
                    </div>
                  )}

                  <div className="flex flex-col items-center pt-3">
                    <button
                      type="submit"
                      className="w-36 bg-white text-black font-semibold text-sm py-2.5 px-1 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-gray-200"
                    >
                      LOGIN
                    </button>
                  </div>

                  <p className="text-center text-gray-600 text-xs mt-4">
                    Restricted area - Authorized personnel only
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}