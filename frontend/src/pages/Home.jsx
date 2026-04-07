import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookCard from "../components/BookCard";
import bgImage from "../../books.png";


export default function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      const { data } = await API.get(`/books?search=${search}`);
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const addBook = async (book) => {
    await API.post("/books", book);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);
    fetchBooks();
  };

  const borrowBook = async (id) => {
    const borrowedBy = prompt("Enter borrower name:");
    if (!borrowedBy) return;
    await API.patch(`/books/${id}/borrow`, { borrowedBy });
    fetchBooks();
  };

  const returnBook = async (id) => {
    await API.patch(`/books/${id}/return`);
    fetchBooks();
  };

  return (
    <div className="dashboard-page"
    style={{
        // backgroundColor:'#a6f4b0',
         backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        //height: "50vh",
      }}>
      <Navbar />

      <main className="container dashboard-container">
        <div className="dashboard-header">
          <div>
            <h2>📚 Library Dashboard</h2>
            <p className="dashboard-subtitle">
              Manage your collection, search books, and track borrowing easily.
            </p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-number">{books.length}</span>
              <span className="stat-label">Total Books</span>
            </div>
          </div>
        </div>

        <div className="top-bar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search books by title, author, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>



        <div className="form-section">
          <h3>Add a New Book</h3>
          <div className="form-row">
            <BookForm onAdd={addBook} />
          </div>
        </div>


        {/* <div className="books-section">
          <div className="section-header">
            <h3>Book Collection</h3>
            <span className="book-count">
              {books.length} {books.length === 1 ? "book" : "books"}
            </span>
          </div>

          <div className="book-grid">
            {books.length > 0 ? (
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
                <div className="empty-icon">📖</div>
                <h4>No books found</h4>
                <p>Try searching with a different keyword or add a new book.</p>
              </div>
            )}
          </div>

        </div> */}
        <div className="books-section">
          <div className="section-header">
            <div>
              <h3 className="section-title">Book Collection</h3>
              <p className="section-subtitle">
                Browse and manage all books in your library
              </p>
            </div>

            <span className="book-count">
              {books.length} {books.length === 1 ? "book" : "books"}
            </span>
          </div>


          <div className="book-grid">
            {books.length > 0 ? (
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
                <div className="empty-icon">📚</div>
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