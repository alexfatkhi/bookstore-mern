import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [image, setImage] = useState(null); // Untuk menyimpan file gambar baru
  const [imageUrl, setImageUrl] = useState(""); // URL gambar lama
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setImageUrl(response.data.image || ""); // Ambil URL gambar lama jika ada
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]);

  const handleEditBook = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publishYear", publishYear);

    if (image) {
      formData.append("image", image); // Kirim file gambar baru jika ada
    }

    try {
      const response = await axios.put(`http://localhost:5555/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Penting untuk mengirim file
      });

      console.log(response.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("An error happened. Please check console");
      console.log(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {/* Tampilkan gambar lama */}
        {imageUrl && (
          <div className="my-4">
            <p className="text-xl text-gray-500">Current Image</p>
            <img
              src={imageUrl}
              alt="Current Book"
              className="w-40 h-60 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        {/* Input untuk upload gambar baru */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditBooks;
