import api from "@/api/api";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async() => {
      const token = localStorage.getItem("authToken");
      if(token) {
        try {
          const response = await api.get<User>("/api/users/profile")
          setUser(response.data)
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
    };
    initializeAuth();
  }, [])

  // A register function
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>("/api/users/auth", {name, email, password});
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      })
      setError(null)
    } catch (error) {
      setError(error.response?.data.message || "Registration failed");
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // login function 
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await api.post<AuthResponse>("/api/users/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      })
    } catch (error) {
      setError(error.response?.data.message || "Login failed");
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;