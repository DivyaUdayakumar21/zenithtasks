import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState("login"); // Choices: "login" or "register"

  // Check on boot if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setView("login");
  };

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div>
      {view === "login" ? (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onSwitchToRegister={() => setView("register")} 
        />
      ) : (
        <Register 
          onRegisterSuccess={() => setView("login")} 
          onSwitchToLogin={() => setView("login")} 
        />
      )}
    </div>
  );
}

export default App;