import mongoose from "mongoose";

// Mengapa timestamps: true Berbeda dengan Properti Lainnya?

//     - Properti title, author, publishYear adalah field utama dalam dokumen
//         Field ini disimpan sebagai bagian dari data yang dimasukkan oleh pengguna.
//         Setiap kali pengguna menyimpan buku, mereka harus memberikan nilai untuk title, author, dan publishYear.

//     - "timestamps: true" adalah pengaturan otomatis dari Mongoose
//         Tidak perlu ditentukan secara eksplisit di dalam objek data.
//         Mongoose akan secara otomatis menambahkan dua field tambahan ke setiap dokumen:
//             createdAt: Menyimpan tanggal & waktu ketika dokumen dibuat.
//             updatedAt: Menyimpan tanggal & waktu ketika dokumen terakhir diperbarui.

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);

// "Book" akan membuat koleksi "Book" di MongoDB
// Koleksi (collection) dalam MongoDB adalah tempat menyimpan dokumen (data), mirip seperti tabel dalam database SQL.
