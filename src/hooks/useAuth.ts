import { useContext } from "react";
import { AuthContextProps, AuthContext } from "../contexts/AuthContext";

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado com um AuthProvider');
  }

  return context;
}
