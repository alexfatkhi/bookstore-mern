- npm run dev --> pada bagian backend
- lalu buka http://localhost:5555/ di browser
- npm i cors

------------------------------------------------------------------------------------------------------------

# 📌 Perbedaan Import dengan dan tanpa `{}` dalam JavaScript

## **1️⃣ Named Import (Menggunakan `{}`)**
```jsx
import { AiOutlineEdit } from "react-icons/ai";
```
✅ **Menggunakan `{}` berarti kita hanya mengambil bagian tertentu dari ekspor modul**.  
✅ Hanya berfungsi jika modul menggunakan **named export**.

### **Contoh Named Export**
```js
export const greet = () => console.log("Hello!");
export const farewell = () => console.log("Goodbye!");
```
Kita bisa mengimpor seperti ini:
```js
import { greet } from "./module"; // ✅ Hanya mengambil greet
```
Jika butuh `farewell`, kita bisa menambahkan:
```js
import { greet, farewell } from "./module";
```

❌ **Tanpa `{}` akan error**, karena tidak ada **default export** dalam file.

---

## **2️⃣ Default Import (Tanpa `{}`)**
```js
import React from "react"; // ✅ Tidak pakai {}
```
✅ **Tanpa `{}` berarti kita mengimpor **default export** dari modul.  
✅ Default export adalah ekspor utama dari file tersebut.  

### **Contoh Default Export**:
```js
export default function greet() {
  console.log("Hello!");
}
```
Kita bisa mengimpor seperti ini:
```js
import greet from "./module"; // ✅ Tanpa {}
```

🚫 **Kita tidak bisa pakai `{}`**, karena `greet` adalah **default export**.

---

## **📌 Perbedaan Utama**
| **Pakai `{}`** | **Tanpa `{}`** |
|---------------|---------------|
| Mengimpor **named exports** | Mengimpor **default export** |
| Harus sesuai dengan nama yang diekspor | Bisa pakai nama sembarang |
| Bisa mengimpor lebih dari satu ekspor | Hanya bisa satu ekspor per file |
| **Contoh:** `import { AiOutlineEdit } from "react-icons/ai";` | **Contoh:** `import React from "react";` |

---

## **🎯 Kesimpulan**
- **Gunakan `{}`** jika mengambil **named export**, misalnya:  
  ```js
  import { useState, useEffect } from "react";
  ```
- **Jangan pakai `{}`** jika mengambil **default export**, misalnya:
  ```js
  import React from "react";
  ```
- `react-icons` hanya memiliki **named exports**, jadi **harus pakai `{}`**:
  ```js
  import { AiOutlineEdit } from "react-icons/ai"; // ✅ Benar
  import AiOutlineEdit from "react-icons/ai"; // ❌ Salah
  ```

---------------------------------------------------------------------------------------------------------------------------------------------------
# 📌 `useParams()` dalam React Router

## **🔹 Apa itu `useParams()`?**
`useParams()` adalah **hook dari React Router** yang digunakan untuk mengambil **parameter dinamis dari URL**.

---

## **🔹 Cara Kerja `useParams()`**
Misalkan kita memiliki **route** yang didefinisikan seperti ini di `App.js`:
```jsx
<Route path="/books/details/:id" element={<ShowBook />} />
```
- `:id` adalah **parameter dinamis** yang dapat diisi dengan nilai tertentu saat user mengakses halaman.

Jika user membuka:
```
http://localhost:3000/books/details/123
```
- `useParams()` akan menangkap `id` sebagai **"123"**.

---

## **🔹 Implementasi `useParams()` dalam `ShowBook.js`**
Pada kode ini:
```jsx
const { id } = useParams();
```
- **`id`** akan berisi nilai dari **`:id`** di URL.
- Jika user mengunjungi `/books/details/abc123`, maka:
  ```js
  console.log(id); // "abc123"
  ```
- `id` kemudian digunakan untuk mengambil data buku berdasarkan ID dari **API**:
  ```js
  axios.get(`http://localhost:5555/books/${id}`)
  ```
  - Ini berarti permintaan API akan mengambil data buku dengan ID **`id`** dari server.

---

## **🔹 Penjelasan Lengkap Kode `ShowBook.js`**
```jsx
const { id } = useParams(); // ✅ Ambil parameter ID dari URL
```
- Saat halaman dimuat, `useEffect()` akan:
  - Mengambil data buku dari **API berdasarkan `id`**.
  - Jika berhasil, **data buku akan disimpan ke `book`**.
  - Jika gagal, akan menampilkan error di console.

---

## **📌 Kesimpulan**
- **`useParams()`** digunakan untuk menangkap **nilai parameter dinamis dari URL**.
- Berguna saat kita ingin **mengambil data berdasarkan ID** dalam aplikasi berbasis routing.
- Dalam kode ini, digunakan untuk **mengambil data buku berdasarkan ID yang dikirim di URL**.

🚀 Sekarang, `ShowBook.js` bisa menampilkan **detail buku yang benar** berdasarkan ID yang ada di URL! 🔥
