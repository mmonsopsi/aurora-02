import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Primeiro, tenta pegar do localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    
    // Se não houver tema salvo, verifica a preferência do sistema
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    // Padrão é light
    return "light";
  });

  useEffect(() => {
    // Atualiza o localStorage
    localStorage.setItem("theme", theme);
    
    // Atualiza a classe no elemento HTML
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
};