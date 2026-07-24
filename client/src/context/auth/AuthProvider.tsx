import React, {  useState } from "react";


import { tokenService } from "../../utils/tokenService";
;
// import { API_PATHS } from "../../data/apiPaths";
import {authContext} from "./authContext"
import type { User } from "../../types";
const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
 
//   useEffect(() => {
//     // const token = localStorage.getItem("token");
//     const token = tokenService.getToken();
//     if (!token) return;

//     const fetchUser = async () => {
    
//       try {
//         const { data } = await axiosClient.get<User>(
//           API_PATHS.AUTH.GET_PROFILE
//         );
//         setUser(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchUser();
//   }, []);

  const updateUser = (userData: User) => {
    setUser(userData);
    if (userData.token) {
      // localStorage.setItem("token", userData.token);
      tokenService.setToken(userData.token);
    }
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <authContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;