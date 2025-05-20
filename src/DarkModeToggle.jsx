// src/components/DarkModeToggle.jsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = stored === "dark" || (!stored && prefersDark);

    setIsDark(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle Theme"
    >
      {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
    </button>
  );
};

export default DarkModeToggle;
