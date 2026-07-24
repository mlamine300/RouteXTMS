import { createContext, useContext } from "react";
import type { User } from "../../types";



export interface AuthContext {
  user: User | null;
  updateUser: (u: User) => void;
  clearUser: () => void;

}

const initialState: AuthContext = {
  user: null,

  updateUser: () => {},
  clearUser: () => {},

};

export const authContext = createContext<AuthContext>(initialState);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};