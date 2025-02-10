import express, { request, response } from "express"; //express: Mengimpor Express.js untuk membuat server HTTP.
import { PORT, mongoDBURL } from "./config.js"; //Mengimpor nilai PORT dari file config.js
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"; //Apapun yang kamu tulis setelah export default akan diambil ketika diimpor di file lain. bookstore itu router. bebas nulisnya, jadi bisa pilih tulis bookstore
import cors from "cors";

const app = express();

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
  console.log(request); //request: Objek yang berisi informasi tentang permintaan dari client.
  console.log("okeeeee mantaapppppp");
  return response.status(234).send("Welcome to MERN Stack Tutorial"); //status 234 akan muncul di bagian browser -> network
});

app.use("/books", booksRoute);
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
