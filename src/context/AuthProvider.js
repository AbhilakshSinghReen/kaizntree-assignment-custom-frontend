import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const storedAuth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;
  const [auth, setAuth] = useState(storedAuth);

//   useEffect(() => {
//     if (auth === storedAuth) {
//       return;
//     }

//     localStorage.setItem("auth", JSON.stringify(auth));
//   }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
