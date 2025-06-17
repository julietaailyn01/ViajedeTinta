import { createContext, useContext, useEffect, useState } from "react";

interface User {
  nombre: string;
  email: string;
  rol: string;
  id: number;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const decodeToken = (token: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        email:
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        nombre: payload["nombre"],
        rol: payload[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
        id: payload["id"],
      };
    } catch (error) {
      console.warn("Token inválido:", error);
      return null;
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const userData = decodeToken(token);
    if (userData) {
      setUser(userData);
    } else {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token detectado en AuthContext:", token);
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        console.log("Usuario decodificado:", userData);
        setUser(userData);
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
