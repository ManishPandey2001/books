import { useState } from "react";

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    isbn: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      publishedYear: form.publishedYear ? Number(form.publishedYear) : undefined,
    });
    setForm({ title: "", author: "", category: "", publishedYear: "", isbn: "" });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Book title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="publishedYear" placeholder="Published year" value={form.publishedYear} onChange={handleChange} />
      <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} />
      <button type="submit" >Add Book</button>
    </form>
  );
}