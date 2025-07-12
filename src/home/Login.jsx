import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import agri_image from "../assets/agri_image.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    if (!email || !password) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // ✅ CRUCIAL: sends cookie for session
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/home");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div
        className="w-full h-full bg-cover bg-center rounded-lg flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${agri_image})` }}
      >
        <div className="pl-10 pb-10 w-full">
          <div className="text-3xl font-bold">AgriTech</div>
          <div className="text-sm text-gray-800 font-bold mt-1">Making farming easy</div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-130 h-150 bg-green-400/20 rounded-2xl">
            <div className="h-20 text-5xl pt-3 flex justify-center shadow-md p-2 transition-all duration-300 ease-in-out hover:scale-95 hover:bg-gray-800 hover:shadow-2xl rounded-lg cursor-default font-bold">
              Login Page
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlelogin();
              }}
              className="h-100 w-130 p-15 space-y-6"
            >
              {/* Email */}
              <label htmlFor="email" className="font-bold">Email</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  className="w-full text-black p-2 pl-10 rounded placeholder-black bg-gray-400 outline-none shadow-lg"
                  type="email"
                  placeholder="Enter your registered email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              {/* Password */}
              <label htmlFor="password" className="font-bold">Password</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full text-black p-2 pl-10 rounded placeholder-black bg-gray-400 outline-none shadow-lg"
                  id="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>

              {/* Forgot Password */}
              <div
                className="text-right text-sm text-blue-700 underline cursor-pointer mt-1 pr-1 hover:text-blue-900"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </div>

              {/* Login Button */}
              <div className="w-full flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={!email || !password || loading}
                  className={`font-bold h-10 w-full rounded-3xl transition transform active:scale-95 duration-150 ${
                    !email || !password || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Register Redirect */}
            <div className="flex justify-center font-bold mt-4">
              Haven't registered yet?
              <span
                onClick={() => navigate("/register")}
                className="text-blue-700 underline cursor-pointer ml-1"
              >
                Click here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
