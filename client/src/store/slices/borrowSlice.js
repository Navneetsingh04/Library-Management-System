import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUpSlice";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    fetchBorrowingsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBorrowingsSuccess: (state, action) => {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchBorrowingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    recordBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    recordBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    fetchAllBorrowingsRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowingsSuccess: (state, action) => {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    returnBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    returnBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    resetBorrowSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchBorrowingsRequest());
  try {
    const response = await axios.get(
      "https://bookworm-server-ff22.onrender.com/api/v1/borrow/my-borrowed-books",
      { withCredentials: true }
    );
    dispatch(
      borrowSlice.actions.fetchBorrowingsSuccess(response.data.borrowedBooks)
    );
  } catch (error) {
    dispatch(
      borrowSlice.actions.fetchBorrowingsFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowingsRequest());
  try {
    const response = await axios.get(
      "https://bookworm-server-ff22.onrender.com/api/v1/borrow/borrowed-books-by-users",
      { withCredentials: true }
    );
    dispatch(
      borrowSlice.actions.fetchAllBorrowingsSuccess(
        response.data.borrowedBooks
      )
    );
  } catch (error) {
    dispatch(
      borrowSlice.actions.fetchAllBorrowingsFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const recordBorrowedBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());
  try {
    const response = await axios.post(
      `https://bookworm-server-ff22.onrender.com/api/v1/borrow/record-borrow-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(
      borrowSlice.actions.recordBookSuccess({
        message: response.data.message,
      })
    );
    dispatch(toggleRecordBookPopup());
  } catch (error) {
    dispatch(
      borrowSlice.actions.recordBookFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const returnBorrowedBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());
  try {
    const response = await axios.put(
      `https://bookworm-server-ff22.onrender.com/api/v1/borrow/return-borrowed-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(
      borrowSlice.actions.returnBookSuccess({
        message: response.data.message,
      })
    );
  } catch (error) {
    dispatch(
      borrowSlice.actions.returnBookFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;
