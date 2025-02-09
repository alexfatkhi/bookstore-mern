import express, { request, response } from "express"; //express: Mengimpor Express.js untuk membuat server HTTP.
import { PORT, mongoDBURL } from "./config.js"; //Mengimpor nilai PORT dari file config.js
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express(); //Membuat instance dari Express.js yang akan digunakan untuk menangani request dan response.

// Middleware for parsing request body
// Memungkinkan server untuk membaca data dalam format JSON dari request.
app.use(express.json());

// app.get(path, callback)
//Jika pengguna mengakses /, maka:
//  Request dicetak ke console.
//  "okeeeee mantaapppppp" juga dicetak ke console.
//  Mengembalikan status HTTP 234 dengan teks "Welcome to MERN Stack Tutorial".

app.get("/", (request, response) => {
  console.log(request); //request: Objek yang berisi informasi tentang permintaan dari client.
  console.log("okeeeee mantaapppppp");
  return response.status(234).send("Welcome to MERN Stack Tutorial"); //status 234 akan muncul di bagian browser -> network
});

// Route for Save a new Book
app.post("/books", async (request, response) => {
  //Memeriksa apakah semua data (title, author, publishYear) ada.
  //Jika ada yang kurang, mengembalikan HTTP 400 (Bad Request) dengan pesan error.
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }

    //Membuat objek buku baru dari data yang dikirim pengguna.
    //Book.create(newBook) digunakan untuk menyimpan ke MongoDB.
    //Mengembalikan HTTP 201 (Created) dengan data buku yang baru disimpan.
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
    //Jika terjadi error, server akan menangani dan mengembalikan HTTP 500 (Internal Server Error).
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get All Books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Get one Book from database by id
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for Update a Book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book update successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Menghubungkan ke MongoDB menggunakan mongoose.connect(mongoDBURL).

// Jika sukses:
// Mencetak "App connected to database".
// Menjalankan server Express.js pada port yang sudah ditentukan (PORT).

// Jika gagal:
// Error akan dicetak ke console.
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "========================================");
  });
