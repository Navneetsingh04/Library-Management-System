import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        error: null,
        message: null,
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
        },
        registerFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        OTPVerificationRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        OTPVerificationSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        OTPVerificationFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        loginRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        
        logoutRequest(state){
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        logoutSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        getUserRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        getUserSuccess(state, action){
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        getUserFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            state.isAuthenticated = false;
        },

        forgotPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },

        resetPasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload.message;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        resetPasswordFailed(state){
            state.loading = false;
            state.error = action.payload;
        },

        updatePasswordRequest(state){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.message = action.payload;
        },
        updatePasswordFailed(state, action){
            state.loading = false;
            state.error = action.payload;
        },

        resetAuthSlice(state){
            state.error = null;
            state.loading = false;
            state.message = null;
        }
    },
});

export const resetSlice = () => (dispatch) => {
    dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
    dispatch(authSlice.actions.registerRequest());
    await axios.post(`https://bookworm-server-ff22.onrender.com/api/v1/auth/register`, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
        dispatch(authSlice.actions.registerSuccess(res.data)); 
    }).catch((error) => {
        dispatch(authSlice.actions.registerFailed(error.response?.data?.message || "Registration failed"));
    });
};

export const OTPVerification = (email, otp) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.OTPVerificationRequest());
        const res = await axios.post(`https://bookworm-server-ff22.onrender.com/api/v1/auth/verifyOTP`, {email, otp}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.OTPVerificationSuccess(res.data));
        } else {
            dispatch(authSlice.actions.OTPVerificationFailed("Unexpected response from server"));
        }
    } catch (error) {
        dispatch(authSlice.actions.OTPVerificationFailed(error.response?.data?.message || "OTP verification failed"));
    }
};

export const login = (data) => async (dispatch) => {
    try {
      dispatch(authSlice.actions.loginRequest());
      const res = await axios.post(`https://bookworm-server-ff22.onrender.com/api/v1/auth/login`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (res.status === 200 || res.status === 201) {
        dispatch(authSlice.actions.loginSuccess(res.data));
      } else {
        dispatch(authSlice.actions.loginFailed("Unexpected response from server"));
      }
    } catch (error) {
      dispatch(authSlice.actions.loginFailed(error.response?.data?.message || "Login failed"));
    }
  };
  

export const logout = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.logoutRequest());
        const res = await axios.get(`https://bookworm-server-ff22.onrender.com/api/v1/auth/logout`, {
            withCredentials: true,
        });
        
        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.logoutSuccess(res.data.message));
        } else {
            dispatch(authSlice.actions.logoutFailed("Unexpected response from server"));
        }
    } catch (error) {
        dispatch(authSlice.actions.logoutFailed(error.response?.data?.message || "Logout failed"));
    }
};

export const getUser = () => async (dispatch) => {
    try {
        dispatch(authSlice.actions.getUserRequest());
        const res = await axios.get(`https://bookworm-server-ff22.onrender.com/api/v1/auth/me`, {
            withCredentials: true,
        });
        
        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.getUserSuccess(res.data));
        } else {
            dispatch(authSlice.actions.getUserFailed("Unexpected response from server"));
        }
    } catch (error) {
        dispatch(authSlice.actions.getUserFailed(error.response?.data?.message || "Failed to get user information"));
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.forgotPasswordRequest());
        const res = await axios.post(`https://bookworm-server-ff22.onrender.com/api/v1/auth/password/forgot`, {email}, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.forgotPasswordSuccess(res.data.message)); 
        } else {
            dispatch(authSlice.actions.forgotPasswordFailed(error.response?.data?.message || "Unexpected response from server"));
        }
    } catch (error) {
        dispatch(authSlice.actions.forgotPasswordFailed(error.response?.data?.message || "Password recovery request failed"));
    }
};

export const resetPassword = (data, token) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.resetPasswordRequest());

        const res = await axios.put(`https://bookworm-server-ff22.onrender.com/api/v1/auth/password/reset/${token}`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.resetPasswordSuccess(res.data.message));
        } else {
            dispatch(authSlice.actions.resetPasswordFailed("Unexpected response from server"));
        }
    } catch (error) {
        // console.error("Full error response:", error.response);
        // console.error("Error message:", error.response?.data?.message);
        dispatch(authSlice.actions.resetPasswordFailed(error.response?.data?.message || "Password reset failed"));
    }
};


export const updatePassword = (data) => async (dispatch) => {
    try {
        dispatch(authSlice.actions.updatePasswordRequest());
        const res = await axios.put(`https://bookworm-server-ff22.onrender.com/api/v1/auth/password/update`, data, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        if (res.status === 200 || res.status === 201) {
            dispatch(authSlice.actions.updatePasswordSuccess(res.data.message));
        } else {
            dispatch(authSlice.actions.updatePasswordFailed("Unexpected response from server"));
        }
    } catch (error) {
        dispatch(authSlice.actions.updatePasswordFailed(error.response?.data?.message || "Password update failed"));
    }
};

export default authSlice.reducer;