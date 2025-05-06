import { createContext, useState, useContext } from "react";
const AppContext = createContext();

export function AppProvider({ children }) {
  const [mode, setMode] = useState("light");
  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  return (
    <AppContext.Provider value={{ mode, toggle }}>
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => useContext(AppContext);
