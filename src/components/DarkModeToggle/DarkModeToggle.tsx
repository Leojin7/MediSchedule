import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import './DarkModeToggle.css';

interface DarkModeToggleProps {
  onToggle: (isDarkMode: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
      onToggle(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      onToggle(false);
    }
  }, [onToggle]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    onToggle(newMode);
  };

  return (
    <button
      className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;