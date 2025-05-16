import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const response = await axios.get("https://bookworm-server-ff22.onrender.com/api/v1/book/all", {
      withCredentials: true,
    });
    dispatch(bookSlice.actions.fetchBooksSuccess(response.data.books));
  } catch (error) {
    let message = "Failed to fetch books.";
    if (error.response) {
      if (error.response.status === 401) {
        message = "Unauthorized. Please log in.";
      } else {
        message = error.response.data?.message || message;
      }
    }
    dispatch(bookSlice.actions.fetchBooksFailure(message));
  }
};

export const addBook = (bookData) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const response = await axios.post(
      "https://bookworm-server-ff22.onrender.com/api/v1/book/admin/add",
      bookData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(bookSlice.actions.addBookSuccess({ message: response.data.message }));
    dispatch(toggleAddBookPopup());
  } catch (error) {
    let message = "Failed to add book.";
    if (error.response) {
      if (error.response.status === 401) {
        message = "Unauthorized. Please log in.";
      } else {
        message = error.response.data?.message || message;
      }
    }
    dispatch(bookSlice.actions.addBookFailure(message));
  }
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
