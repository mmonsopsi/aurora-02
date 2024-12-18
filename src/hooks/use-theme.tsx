import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verifica se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Retorna o tema salvo, ou a preferência do sistema, ou light como padrão
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};