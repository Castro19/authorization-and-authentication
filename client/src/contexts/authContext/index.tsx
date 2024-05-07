import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// Define types for the context
interface AuthContextType {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  userName: string | null;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [userId, setUserId] = useState<string | null>(null); // State to store the user ID
  const [userName, setUserName] = useState<string | null>(null);

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        setUserId(user.uid); // Set user ID from the user object
        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserName(null); // Clear userName when no user is logged in

        setUserId(null); // Clear user ID when no user is logged in
        setUserLoggedIn(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    userId, // Include the userId in the context value
    currentUser,
    setCurrentUser,
    userName,
    setUserName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
