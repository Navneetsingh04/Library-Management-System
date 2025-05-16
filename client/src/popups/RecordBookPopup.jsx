import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { recordBorrowedBook } from "../store/slices/borrowSlice";
import {toggleRecordBookPopup } from "../store/slices/popUpSlice";

const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const [email ,setEmail] = useState("")
  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowedBook(email, bookId));
  };
  return (
    <div className="fixed inset-0 bg-black/50 p-3 sm:p-5 flex items-center justify-center z-50">
      <div className="w-full sm:w-1/2 md:w-1/3 bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 ">Record Book</h3>
        <form onSubmit={handleRecordBook}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              User Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Borrower email"
              className="w-full border-2 border-gray-300  rounded px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded cursor-p"
          >
            Record Book
          </button>
          <button
            type="button"
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200 ml-2"
            onClick={() => dispatch(toggleRecordBookPopup())}
          >
            Close
          </button>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              Please enter the email of the person borrowing the book.
            </p>

          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default RecordBookPopup;
