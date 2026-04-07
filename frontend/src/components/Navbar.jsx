import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>📚 Library App</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}