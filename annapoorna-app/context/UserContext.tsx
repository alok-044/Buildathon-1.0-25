import React, { createContext, useState } from "react";

type UserContextType = {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  language: "en" | "hi";
  setLanguage: (l: "en" | "hi") => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<"en" | "hi">("en");

  return (
    <UserContext.Provider value={{ theme, setTheme, language, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}
