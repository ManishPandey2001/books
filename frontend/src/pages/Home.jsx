import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";

export default function Home({ onLogout }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await API.get(`/books?search=${search}`);
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books", err);
      setError("Unable to load books right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const addBook = async (book) => {
    try {
      setSubmitting(true);
      setError("");
      await API.post("/books", book);
      setMessage("Book added successfully.");
      await fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not add the book.");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteBook = async (id) => {
    try {
      setError("");
      await API.delete(`/books/${id}`);
      setMessage("Book deleted.");
      await fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete the book.");
    }
  };

  const borrowBook = async (id) => {
    const borrowedBy = window.prompt("Enter borrower name:");
    if (!borrowedBy) return;

    try {
      setError("");
      await API.patch(`/books/${id}/borrow`, { borrowedBy });
      setMessage(`Book borrowed by ${borrowedBy}.`);
      await fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not borrow the book.");
    }
  };

  const returnBook = async (id) => {
    try {
      setError("");
      await API.patch(`/books/${id}/return`);
      setMessage("Book returned successfully.");
      await fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Could not return the book.");
    }
  };

  const availableCount = books.filter((book) => book.available).length;
  const borrowedCount = books.length - availableCount;

  return (
    <div className="dashboard-page">
      <Navbar onLogout={onLogout} />

      <main className="container dashboard-container">
        <section className="dashboard-hero">
          <div className="dashboard-header">
            <div>
              <span className="section-kicker">Collection dashboard</span>
              <h2>Library Dashboard</h2>
              <p className="dashboard-subtitle">
                Manage your collection, search books, and track borrowing with a
                cleaner workflow.
              </p>
            </div>

            <div className="dashboard-stats">
              <div className="stat-card">
                <span className="stat-number">{books.length}</span>
                <span className="stat-label">Total Books</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{availableCount}</span>
                <span className="stat-label">Available</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{borrowedCount}</span>
                <span className="stat-label">Borrowed</span>
              </div>
            </div>
          </div>

          <div className="top-bar">
            <div className="search-box">
              <span className="search-icon">Search</span>
              <input
                type="text"
                placeholder="Search books by title, author, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="search-meta">
              <span>{search ? `Showing results for "${search}"` : "Showing all books"}</span>
            </div>
          </div>

          {(message || error) && (
            <div className={`feedback-banner ${error ? "feedback-error" : "feedback-success"}`}>
              {error || message}
            </div>
          )}
        </section>

        <div className="form-section">
          <div className="form-section-header">
            <div>
              <h3>Add a New Book</h3>
              <p>Fill in the details below to add another title to your collection.</p>
            </div>
            {submitting && <span className="form-status">Saving...</span>}
          </div>
          <div className="form-row">
            <BookForm onAdd={addBook} />
          </div>
        </div>

        <div className="books-section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Book Collection</h3>
              <p className="section-subtitle">
                {loading
                  ? "Refreshing your collection..."
                  : "Borrow, return, or remove books from one place."}
              </p>
            </div>

            <span className="book-count">
              {books.length} {books.length === 1 ? "book" : "books"}
            </span>
          </div>

          <div className="book-grid">
            {loading ? (
              <div className="empty-state">
                <h4>Loading books</h4>
                <p>Please wait while the collection is being refreshed.</p>
              </div>
            ) : books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={deleteBook}
                  onBorrow={borrowBook}
                  onReturn={returnBook}
                />
              ))
            ) : (
              <div className="empty-state">
                <h4>No books found</h4>
                <p>Try another search or add a new book to your collection.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
