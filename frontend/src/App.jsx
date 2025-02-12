import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBooks from "./pages/EditBooks";
import DeleteBooks from "./pages/DeleteBooks";

function App() {
  return (
    <Routes>
      {/* Halaman utama akan dirender saat user membuka / */}
      <Route path="/" element={<Home />} /> 
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/edit/:id" element={<EditBooks />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
    </Routes>
  );
}

export default App;
