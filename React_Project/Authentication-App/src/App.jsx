import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

const API_BASE = "https://api.freeapi.app/api/v1/users";

const App = () => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState(false);
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      setAuthStatus(false);
      return;
    }
    try {
      const res = await axios.get(`${API_BASE}/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.data);
      setAuthStatus(true);
    } catch (err) {
      localStorage.removeItem("authToken");
      setUser(null);
      setAuthStatus(false);
    }
  };

  const register = async (payload) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, payload, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = response.data;
      const token = data.data.accessToken;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      setUser(data);
      setAuthStatus(true);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  const login = async (payload) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, payload, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });
      const data = response.data;
      const token = data.data.accessToken;
      if (token) {
        localStorage.setItem("authToken", token);
      }
      setUser(data);
      setAuthStatus(true);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/logout`,
        {},
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        },
      );
      localStorage.removeItem("authToken");
      setUser(null);
      setAuthStatus(false);
      setError("");
    } catch (error) {
      localStorage.removeItem("authToken");
      setUser(null);
      setAuthStatus(false);
      setError("");
    }
  };

  const value = {
    user,
    authStatus,
    setAuthStatus,
    setUser,
    register,
    login,
    logout,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">Auth App</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {authStatus ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Current User</h2>
            <p className="mb-2">
              <strong>Username:</strong> {user?.data?.user?.username || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user?.data?.user?.email || "N/A"}
            </p>
            <p className="mb-4">
              <strong>Role:</strong> {user?.data?.user?.role || "N/A"}
            </p>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded font-semibold ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded font-semibold ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Register
              </button>
            </div>
            {isLogin ? (
              <Login onLogin={login} />
            ) : (
              <Register onRegister={register} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
