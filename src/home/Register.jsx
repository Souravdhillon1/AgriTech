import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import PADDY from "../assets/PADDY.jpg";

function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include", // ✅ This preserves the session
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/home');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div
        className="w-full h-full bg-cover bg-center rounded-lg flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${PADDY})` }}
      >
        <div className="pl-10 pb-10 text-left w-full">
          <div className="text-3xl font-bold">AgriTech</div>
          <div className="text-sm text-gray-800 font-bold mt-1">Making farming easy</div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-130 h-150 bg-green-400/30 rounded-2xl">
            <div className="h-18 text-5xl pt-3 flex justify-center shadow-md p-2 transition-all duration-300 ease-in-out hover:scale-95 hover:bg-gray-800 hover:shadow-2xl rounded-lg cursor-default font-bold">
              Register
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="h-110 w-130 p-15 space-y-10"
            >
              {/* Name */}
              <label htmlFor="name" className="font-bold">Name</label>
              <div className="relative">
                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  className="w-full text-black p-2 pl-10 rounded placeholder-black bg-gray-400 outline-none shadow-lg"
                  type="text"
                  placeholder="Enter your full name"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* Email */}
              <label htmlFor="email" className="font-bold">Email</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                <input
                  className="w-full text-black p-2 pl-10 rounded placeholder-black bg-gray-400 outline-none shadow-lg"
                  type="email"
                  placeholder="Enter your email"
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

              {/* Submit Button */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  disabled={!name || !email || !password || loading}
                  className={`font-bold h-10 w-full rounded-3xl transition transform active:scale-95 duration-150 ${
                    !name || !email || !password || loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>

            {/* Already Registered */}
            <div className="flex justify-center font-bold mt-4">
              Already registered?
              <span
                onClick={() => navigate('/login')}
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

export default Register;
