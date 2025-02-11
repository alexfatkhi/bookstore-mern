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

Semoga bermanfaat! 🚀
