import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, fetchAllBooks } from "../store/slices/bookSlice";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!title || !author || !price || !quantity || !description) {
      alert("Please fill all the fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("description", description);

    dispatch(addBook(formData));
    dispatch(fetchAllBooks());

    setTitle("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setDescription("");
    dispatch(toggleAddBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black/50 p-3 sm:p-5 flex items-center justify-center z-50">
      <div className="w-full sm:w-1/2 md:w-1/2 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Record Book</h3>
          <form onSubmit={handleAddBook}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Book Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book title"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Book Author</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Book Author"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Book Price (for borrowing)</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Book Price"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Book Quantity</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Book Quantity"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Book Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book Description"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
                rows="4"
                cols="50"
                maxLength="500"
              />
            </div>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded cursor-pointer">
              Add Book
            </button>
            <button
              type="button"
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200 ml-2 cursor-pointer"
              onClick={() => dispatch(toggleAddBookPopup())}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookPopup;
