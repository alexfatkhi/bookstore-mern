import express, { request, response } from "express"; //express: Mengimpor Express.js untuk membuat server HTTP.
import { PORT, mongoDBURL } from "./config.js"; //Mengimpor nilai PORT dari file config.js
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"; //Apapun yang kamu tulis setelah export default akan diambil ketika diimpor di file lain. bookstore itu router. bebas nulisnya, jadi bisa pilih tulis bookstore
import cors from "cors";

const app = express(); // adalah fungsi yang digunakan untuk membuat instance dari aplikasi Express. Dengan kata lain, ini adalah langkah pertama untuk membuat server menggunakan Express.js.
// express() adalah fungsi utama dari Express.js yang digunakan untuk membuat aplikasi Express baru. Objek app yang dihasilkan digunakan untuk:
//     Mendaftarkan route (GET, POST, PUT, DELETE).
//     Menambahkan middleware (seperti express.json(), cors(), dll).
//     Menghubungkan database dan mengatur konfigurasi lainnya.
//     Menjalankan server HTTP.

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origin with default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  console.log("okeeeee mantaapppppp");
  return response.status(234).send("Welcome to MERN Stack Tutorial"); //status 234 akan muncul di bagian browser -> network
});

app.use("/books", booksRoute);
//By writing app.use("/books", booksRoute);, you are telling Express: "Hey, whenever a request starts with /books, pass it to booksRoute."
// 👉 Baris kode ini berarti semua rute dalam booksRoute.js akan memiliki prefix /books.
// Jadi, kalau di booksRoute.js ada rute /, maka di aplikasi utama akan menjadi /books.
// 👉 disini index.js menghubungkan booksRoute.js
// 👉 membuat aliran eksekusi berjalan dari index.js ke booksRoute.js.

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
