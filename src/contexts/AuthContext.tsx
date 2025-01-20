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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if(token) {
      api.get<User>("/api/users", { headers: })
    }
  })

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
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // login function 
  const login = async (email: string, password: string) => {
    try {
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
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        logout,
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