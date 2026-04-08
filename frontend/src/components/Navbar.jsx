import { useNavigate } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <p className="navbar-eyebrow">Library workspace</p>
        <h1>Library App</h1>
      </div>
      <div className="navbar-actions">
        <div className="navbar-user">
          <span className="navbar-user-label">Signed in as</span>
          <strong>{user?.name || user?.email || "Reader"}</strong>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
