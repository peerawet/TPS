import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      // สำเร็จแล้ว navigate ไป documents
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      <div className="min-h-screen flex items-center justify-center bg-gray-500">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-md flex overflow-hidden">
          {/* ด้านซ้าย ฟอร์มลงทะเบียน */}
          <div className="w-full md:w-1/2 p-8 bg-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
            {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 rounded-lg ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                } text-white font-semibold transition-colors`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          </div>

          {/* ด้านขวา รูปภาพ */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-200">
            <img
              src="/bg.webp"
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
