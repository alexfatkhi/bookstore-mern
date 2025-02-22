import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
    image: { type: String, default: "" }, // Tambahkan field image
  },
  { timestamps: true } // Menambahkan waktu pembuatan dan update otomatis
);

export const Book = mongoose.model("Book", bookSchema);
