import { useContext } from "react";
import { MyContext } from "../Context/myContext";

interface ThemeToggleProps {
  className?: string;
  showText?: boolean;
}

export default function ThemeToggle({ className = "", }: ThemeToggleProps) {
  const context = useContext(MyContext);

  const toggleTheme = () => {
    if (context?.setTheme) {
      const newTheme = context.theme === "light" ? "dark" : "light";
      context.setTheme(newTheme);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 theme-text ${className}`}
      title={context?.theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      <div className="flex items-center gap-2">
        {context?.theme === "light" ? (
          <>
            <i className="fas fa-moon text-yellow-500"></i>
           
          </>
        ) : (
          <>
            <i className="fas fa-sun text-yellow-500"></i>
          
          </>
        )}
      </div>
    </button>
  );
} 