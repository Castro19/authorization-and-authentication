import React, { useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import {
  handleSignup,
  handleLogin,
} from "@/components/register/helpers/handleUser";
import { User } from "@/types";

interface CustomToken {
  userName: string;
  userId: string;
}

// Define types for the context
type loginReturnType = {
  userId?: string;
  userName?: string;
  code?: string;
  message?: string;
};

interface AuthContextType {
  userLoggedIn: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (userName: string, password: string) => Promise<loginReturnType>;
  signup: (userName: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create a context with default values
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Optionally verify the token with the backend here
        try {
          const response = await fetch(
            "http://localhost:4000/registers/verifyToken",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            // Decode token to get user data
            const decoded = jwtDecode<CustomToken>(token);

            setCurrentUser({
              userName: decoded.userName,
              userId: decoded.userId,
            });
            setUserLoggedIn(true);
          } else {
            localStorage.removeItem("token");
            setUserLoggedIn(false);
          }
        } catch (error) {
          console.error("Failed to verify token:", error);
          localStorage.removeItem("token");
          setUserLoggedIn(false);
        }
      }
      setLoading(false);
    };
    checkAuthState();
  }, []);

  const login = async (
    userName: string,
    password: string
  ): Promise<loginReturnType> => {
    const userData = await handleLogin(userName, password);
    console.log("USER DATA AFTER LOGIN: ", userData);
    if (userData.token) {
      setCurrentUser({ userName: userData.userName, userId: userData.userId });
      setUserLoggedIn(true);
    }
    return userData;
  };

  const signup = async (userName: string, password: string) => {
    const userData = await handleSignup(userName, password);
    if (userData.token) {
      setCurrentUser({ userName: userData.userName, userId: userData.userId });
      setUserLoggedIn(true);
    } else {
      console.error("Signup failed:", userData.message);
      throw new Error(userData.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove the stored JWT
    setCurrentUser(null); // Reset user context
    setUserLoggedIn(false); // Update logged in status
  };

  const value = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
