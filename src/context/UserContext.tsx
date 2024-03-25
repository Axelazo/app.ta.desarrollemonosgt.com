import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useApi from "../hooks/useApi";

interface User {
  username: string;
  token: string;
  // Add other properties of user if available
}

interface ContextValue {
  user: User | null;
  logoff: () => void;
  login: (userData: User, redirectToHome: () => void) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<ContextValue | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();
  const toast = useToast();
  let isToastShowing = false;
  const navigate = useNavigate();

  const showNetworkErrorToast = () => {
    // Show a toast for network errors
    if (!isToastShowing) {
      isToastShowing = true;
      toast({
        title: "Error de red",
        description:
          "No se ha podido contactar al servidor, por favor intente de nuevo más tarde",
        status: "error",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          isToastShowing = false; // Reset the flag when toast is closed
        },
      });
    }
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = await api.get<User>("/verifyToken", {
          params: { token },
        });
        setUser(userData);
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
        showNetworkErrorToast();
      }
    }
  };

  useEffect(() => {
    verifyToken();

    const handleClick = () => {
      console.log("I'm verifying the token on every click!");
      verifyToken();
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick); // Cleanup click event listener
    };
  }, []);

  const logoff = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const login = (userData: User, redirectToHome: () => void) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    redirectToHome();
  };

  return (
    <UserContext.Provider value={{ user, logoff, login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
