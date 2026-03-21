import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    walletBalance: 0,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Login ke waqt ya Profile fetch karte waqt use karein
        setUser: (state, action) => {
            state.userData = action.payload;
            state.walletBalance = action.payload.walletBalance || 0;
            state.isAuthenticated = true;
        },
        // Sirf wallet balance update karne ke liye
        updateWallet: (state, action) => {
            state.walletBalance = action.payload;
        },
        // Logout ke liye
        logout: (state) => {
            state.userData = null;
            state.walletBalance = 0;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, updateWallet, logout } = userSlice.actions;
export default userSlice.reducer;