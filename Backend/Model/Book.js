import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },publishedYear: {
      type: Number,
    },
    isbn: {
      type: String,
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    borrowedBy: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);