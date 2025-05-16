import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllBorrowedBooks,
  returnBorrowedBook,
} from "../store/slices/borrowSlice";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";

const ReturnBookPopup = ({ bookId, email }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState(email || "");

  const handleReturnBook = (e) => {
  e.preventDefault();

  dispatch(returnBorrowedBook(userEmail, bookId))
    .then(() => {
      toast.success("Book returned successfully");
      dispatch(fetchAllBorrowedBooks());
      dispatch(toggleReturnBookPopup());
    })
    .catch((error) => {
      toast.error(error.message || "Something went wrong");
    });
};


  return (
    <div className="fixed inset-0 bg-black/50 p-3 sm:p-5 flex items-center justify-center z-50">
      <div className="w-full sm:w-1/2 md:w-1/3 bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                User Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Borrower's email"
                className="w-full border-2 border-gray-300 rounded px-3 py-2 focus:outline-none"
                required
                disabled
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Return Book
            </button>
            <button
              type="button"
              className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200 ml-2"
              onClick={() => dispatch(toggleReturnBookPopup())}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookPopup;
