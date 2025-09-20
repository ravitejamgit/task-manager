import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/login" element = { <Login />} />
          <Route path = "/profile" element = { <Profile />} />
          <Route path = "/dashboard" element = { <Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
