import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import booksImage from "../../books.png";

export default function Login({ onLogin }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin?.();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel auth-panel-brand">
          <span className="auth-kicker">Digital shelf management</span>
          <h1>Keep your library organized, searchable, and easy to manage.</h1>
          <p>
            Track books, manage borrowing, and keep your collection tidy from one
            calm dashboard.
          </p>
          <div className="auth-highlights">
            <div>
              <strong>Fast search</strong>
              <span>Find books by title, author, or category in seconds.</span>
            </div>
            <div>
              <strong>Borrow tracking</strong>
              <span>See what is available and who currently has a book.</span>
            </div>
            <div>
              <strong>Simple workflow</strong>
              <span>Add, return, and remove books without extra clicks.</span>
            </div>
          </div>
        </section>

        <section className="auth-panel auth-card">
          <div className="auth-card-header">
            <span className="auth-badge">Library Access</span>
            <h2>Welcome back</h2>
            <p>Sign in to open your dashboard.</p>
          </div>

          <div className="auth-card-image">
            <img src={booksImage} alt="Stack of books" />
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className="form-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
