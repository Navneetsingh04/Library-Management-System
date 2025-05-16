import React from "react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black/50 p-3 sm:p-5 flex items-center justify-center z-50">
      <div className="w-11/2 sm:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center bg-black text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-lg font-bold">View Book Info</h2>
          <button
            className="text-white text-md font-bold"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">Book Details</h3>
          <p className="mb-2">
            <strong>Book Title:</strong> {book.title}
          </p>
          <p className="mb-2">
            <strong>Author:</strong> {book.author}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {book.description}
          </p>
          <button
            className="mt-4 bg-gray-200 text-black px-4 py-2 rounded"
            onClick={() => dispatch(toggleReadBookPopup())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
