import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    user: null,
    isAuthenticated: Boolean(localStorage.getItem("token")),
  });

  // ✅ register (ส่ง name ด้วย)
  const register = async (name, email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { name, email, password } // 👈 ส่ง name เข้าไปด้วย
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setState({
        user: user || null,
        isAuthenticated: true,
      });

      navigate("/documents");
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  // login
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      const { token, user } = response.data; // สมมติ API ส่งมาแบบนี้

      // เก็บ token
      localStorage.setItem("token", token);
      console.log("Token:", token);

      // อัปเดตสถานะ login สำเร็จ
      setState({
        user: user || null,
        isAuthenticated: true,
      });

      navigate("/documents"); // ไปหน้า documents
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setState({
      user: null,
      isAuthenticated: false,
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        setState,
        login,
        logout,
        register,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
