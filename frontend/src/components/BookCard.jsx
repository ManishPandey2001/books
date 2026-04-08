import { useMemo, useState } from "react";

const coverThemes = [
  {
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    accent: "#92400e",
    shape: "#f59e0b",
    secondary: "#fff7ed",
  },
  {
    gradient: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
    accent: "#0f4c5c",
    shape: "#38bdf8",
    secondary: "#f0f9ff",
  },
  {
    gradient: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
    accent: "#166534",
    shape: "#4ade80",
    secondary: "#f0fdf4",
  },
  {
    gradient: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
    accent: "#9d174d",
    shape: "#ec4899",
    secondary: "#fdf2f8",
  },
  {
    gradient: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
    accent: "#5b21b6",
    shape: "#8b5cf6",
    secondary: "#f5f3ff",
  },
  {
    gradient: "linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)",
    accent: "#86198f",
    shape: "#d946ef",
    secondary: "#fdf4ff",
  },
];

const hashString = (value) =>
  value.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

const getCoverTheme = (book) => {
  const seed = hashString(`${book.title}${book.author}${book.category || ""}`);
  return coverThemes[seed % coverThemes.length];
};

export default function BookCard({ book, onDelete, onBorrow, onReturn }) {
  const coverTheme = getCoverTheme(book);
  const imageSeed = useMemo(
    () => encodeURIComponent(`${book.title}-${book.author}-${book.category || "library"}`),
    [book.author, book.category, book.title]
  );
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/600/360`;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="book-card">
      <div className="book-cover" style={{ background: coverTheme.gradient }}>
        {!imageFailed && (
          <img
            className="book-cover-image"
            src={imageUrl}
            alt={`${book.title} cover`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        <div className="book-cover-overlay">
          <span className="book-cover-label">{book.category || "Library Pick"}</span>
        </div>
      </div>

      <div className="book-card-top">
        <span className={`status-badge ${book.available ? "status-available" : "status-borrowed"}`}>
          {book.available ? "Available" : "Borrowed"}
        </span>
        <span className="book-category">{book.category || "General"}</span>
      </div>

      <h3>{book.title}</h3>
      <p className="book-author">{book.author}</p>

      <div className="book-meta">
        <span>Year: {book.publishedYear || "N/A"}</span>
        <span>ISBN: {book.isbn || "Not added"}</span>
      </div>

      <p className="book-status-text">
        {book.available ? "Ready to borrow" : `Borrowed by ${book.borrowedBy || "Unknown user"}`}
      </p>

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
