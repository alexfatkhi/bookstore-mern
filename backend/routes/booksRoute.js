import express from "express";
import { Book } from "../models/bookModel.js";
import cloudinary from "../config.js";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Setup multer untuk upload file sementara
const upload = multer({ dest: "uploads/" });

// ✅ Route untuk Menambah Buku dengan Gambar
router.post("/", upload.single("image"), async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: title, author, publishYear",
        });
    }

    // Upload ke Cloudinary jika ada gambar
    let imageUrl = "";
    if (request.file) {
      const result = await cloudinary.uploader.upload(request.file.path, {
        folder: "bookstore",
      });
      console.log("Cloudinary Upload Result:", result.secure_url); // ✅ Debugging
      imageUrl = result.secure_url;
      fs.unlinkSync(request.file.path); // Hapus file sementara
    }

    const newBook = await Book.create({
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      image: imageUrl, // ✅ Simpan URL gambar ke database
    });

    return response.status(201).send(newBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ✅ Route untuk Mengupdate Buku (Termasuk Gambar)
router.put("/:id", upload.single("image"), async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: title, author, publishYear",
        });
    }

    const { id } = request.params;
    let updateData = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Upload ke Cloudinary jika ada gambar baru
    if (request.file) {
      const result = await cloudinary.uploader.upload(request.file.path, {
        folder: "bookstore",
      });
      console.log("Updated Image URL:", result.secure_url); // ✅ Debugging
      updateData.image = result.secure_url;
      fs.unlinkSync(request.file.path); // Hapus file sementara
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send(updatedBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ✅ Route untuk Mengambil Semua Buku
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ✅ Route untuk Mengambil Satu Buku Berdasarkan ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// ✅ Route untuk Menghapus Buku
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
