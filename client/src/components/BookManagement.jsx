import React, { useEffect, useState } from "react";
import { BookA, NotebookPen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleAddNewAdminPopup,
  toggleAddBookPopup,
} from "../store/slices/popUpSlice";
import { resetBookSlice, fetchAllBooks } from "../store/slices/bookSlice";
import {
  resetBorrowSlice,
  fetchUserBorrowedBooks,
} from "../store/slices/borrowSlice";
import Header from "../layout/Header";
import AddBookPopup from "../popups/AddBookPopup";
import ReadBookPopup from "../popups/ReadBookPopup";
import RecordBookPopup from "../popups/RecordBookPopup";

const BookManagement = () => {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { addBookPopup, readBookPopup, recordBookPopup } = useSelector(
    (state) => state.popup
  );

  const {
    loading: borrowLoading,
    error: borrowError,
    message: borrowMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadBookPopup = (id) => {
    const book = books.find((book) => book._id === id);
    if (book) {
      setReadBook(book);
    }
    dispatch(toggleReadBookPopup());
  };

  const [borrowBookId, setBorrowBookId] = useState("");
  const openRecordBookPopup = (id) => {
    setBorrowBookId(id);
    dispatch(toggleRecordBookPopup());
  };

  useEffect(() => {
    dispatch(fetchAllBooks());
    if (user?.role === "User") {
      dispatch(fetchUserBorrowedBooks());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (message || borrowMessage) {
      toast.success(message || borrowMessage);
      dispatch(fetchAllBooks());
      dispatch(fetchUserBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error || borrowError) {
      toast.error(error || borrowError);
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [
    dispatch,
    error,
    message,
    loading,
    borrowError,
    borrowMessage,
    borrowLoading,
  ]);

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };
  const searchedBooks =
    books?.filter((book) =>
      book?.title?.toLowerCase().includes(searchedKeyword)
    ) || [];

  return (
    <>
      <main className="relative flex-1 p-6 pt-28 overflow-auto min-h-screen">
        <Header />

        {/* Sub Header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "Admin" ? "Book Management" : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {isAuthenticated && user?.role === "Admin" && (
              <button
                className="relative pl-12 pr-6 w-full sm:w-48 flex items-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300 group"
                onClick={() => dispatch(toggleAddBookPopup())}
              >
                <span className="absolute left-4 flex items-center justify-center bg-white text-black rounded-full w-6 h-6 font-medium group-hover:scale-110 transition-transform cursor-pointer">
                  +
                </span>
                <span className="w-full text-center font-medium tracking-wide cursor-pointer">
                  Add Book
                </span>
              </button>
            )}
            <input
              type="text"
              placeholder="Search books..."
              className="w-full sm:w-48 border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
              value={searchedKeyword}
              onChange={handleSearch}
            />
          </div>
        </header>

        {/* Table */}
        {books?.length > 0 ? (
          <div className="w-full overflow-x-auto mt-6 bg-white rounded-md shadow-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Author</th>
                  {isAuthenticated && user?.role === "Admin" && (
                    <th className="py-3 px-4 text-left">Quantity</th>
                  )}
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Availability</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchedBooks.map((book, index) => (
                  <tr
                    key={book._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4">{book.title}</td>
                    <td className="py-3 px-4">{book.author}</td>
                    {isAuthenticated && user?.role === "Admin" && (
                      <td className="py-3 px-4">{book.quantity}</td>
                    )}
                    <td className="py-3 px-4">₹ {book.price}</td>
                    <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          book.availability 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {book.availability ? "Available" : "Unavailable"}
                        </span>
                    </td>
                    <td className="py-3 px-4">
                      {isAuthenticated && user?.role === "Admin" ? (
                        <div className="flex space-x-4 justify-center">
                          <BookA
                            className="text-blue-500 cursor-pointer"
                            onClick={() => openReadBookPopup(book._id)}
                          />
                          <NotebookPen
                            className="text-green-500 cursor-pointer"
                            onClick={() => openRecordBookPopup(book._id)}
                          />
                        </div>
                      ) : (
                        <div className="flex gap-x-2">
                          <button
                            onClick={() => openReadBookPopup(book._id)}
                            className="text-blue-500 hover:underline"
                          >
                            Read
                          </button>
                          <button
                            onClick={() => openRecordBookPopup(book._id)}
                            className="text-green-500 hover:underline"
                          >
                            Borrow
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 sm:h-48">
            <h3 className="text-center font-medium text-xl sm:text-3xl text-gray-500">
              No books available.
            </h3>
          </div>
        )}
      </main>
      {addBookPopup && <AddBookPopup />}
      {readBookPopup && <ReadBookPopup book={readBook} />}
      {recordBookPopup && <RecordBookPopup bookId={borrowBookId} />}
    </>
  );
};

export default BookManagement;
