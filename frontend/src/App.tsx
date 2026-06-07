import Sidebar from "./components/Sidebar/index.tsx";
import "./App.css";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/index.tsx";
import HistoryPage from "./pages/History/index.tsx";

function App() {
  const [isActivePage, setIsActivePage] = useState("dashboard");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-container libre-baskerville">
      <Sidebar setIsActivePage={setIsActivePage} />

      <main className="main-content">
        {isActivePage === "dashboard" && (
          <Dashboard theme={theme} toggleTheme={toggleTheme} />
        )}
        {isActivePage === "history" && (
          <HistoryPage theme={theme} toggleTheme={toggleTheme} />
        )}
      </main>
    </div>
  );
}

export default App;