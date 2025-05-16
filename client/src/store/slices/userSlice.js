import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { toggleAddNewAdminPopup } from "./popUpSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    fetchAllUsersRequest: (state) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailure: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },
    addNewAdminRequest: (state) => {
      state.loading = true;
    },
    addNewAdminSuccess: (state, action) => {
      state.loading = false;
      toast.success("Admin Added Successfully");
      state.users.push(action.payload);
    },
    addNewAdminFailure: (state, action) => {
      state.loading = false;
      toast.error(action.payload);
    },
  },
});

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchAllUsersRequest());
  await axios
    .get("https://bookworm-server-ff22.onrender.com/api/v1/user/all",{withCredentials: true})
    .then((res) => {
      dispatch(userSlice.actions.fetchAllUsersSuccess(res.data.users));
    })
    .catch((err) => {
      dispatch(userSlice.actions.fetchAllUsersFailure(err.response.data.message));
    });
};

export const addNewAdmin = (data) => async (dispatch) => {
  dispatch(userSlice.actions.addNewAdminRequest());
  await axios
    .post("https://bookworm-server-ff22.onrender.com/api/v1/user/add/new-admin", data, {withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((res) => {
      dispatch(userSlice.actions.addNewAdminSuccess(res.data.user));
        toast.success("Admin Added Successfully");
        dispatch(toggleAddNewAdminPopup())
    })
    .catch((err) => {
      dispatch(userSlice.actions.addNewAdminFailure(err.response.data.message));
        toast.error(err.response.data.message);
    });
};

export default userSlice.reducer;