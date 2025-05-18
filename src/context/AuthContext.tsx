
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session token
    const token = Cookies.get("mango-session");
    
    if (token) {
      // For demo purposes, we'll fake a user from token
      // In production, you would validate the token with your backend
      const fakeUser = {
        id: "1",
        name: "Demo User",
        email: "user@example.com",
        role: "user" as const, // explicitly type as "user" | "admin"
      };
      setUser(fakeUser);
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Set cookie with expiry time (7 days)
      Cookies.set("mango-session", "demo-token-xyz", { expires: 7 });
      
      // Set fake user data
      setUser({
        id: "1",
        name: email.split("@")[0], // Extract name from email
        email,
        role: email.includes("admin") ? "admin" : "user",
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, this would return OTP validation requirement
      return;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    try {
      setLoading(true);
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Set cookie with expiry time (7 days)
      Cookies.set("mango-session", "demo-token-xyz", { expires: 7 });
      
      // Set user data after OTP verification
      setUser({
        id: "1",
        name: email.split("@")[0], // Extract name from email
        email,
        role: "user",
      });
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("mango-session");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    loading,
    login,
    signup,
    verifyOTP,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
