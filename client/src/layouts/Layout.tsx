import  { type ReactElement } from "react";
import { ThemeProvider } from "next-themes";
import AuthProvider from "../context/auth/authProvider";


const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
