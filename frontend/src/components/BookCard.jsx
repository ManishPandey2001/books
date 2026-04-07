export default function BookCard({ book, onDelete, onBorrow, onReturn }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category || "General"}</p>
      <p><strong>Year:</strong> {book.publishedYear || "N/A"}</p>
      <p><strong>Status:</strong> {book.available ? "Available" : `Borrowed by ${book.borrowedBy}`}</p>

      <div className="actions">
        {book.available ? (
          <button onClick={() => onBorrow(book._id)}>Borrow</button>
        ) : (
          <button onClick={() => onReturn(book._id)}>Return</button>
        )}
        <button onClick={() => onDelete(book._id)}>Delete</button>
      </div>
    </div>
    
  );
}