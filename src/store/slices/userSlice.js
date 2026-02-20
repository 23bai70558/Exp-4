import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  preferences: {
    darkMode: false,
    language: 'en'
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
    updatePreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload
      };
    }
  }
});

// Actions
export const { setUser, clearUser, updatePreferences } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectUserPreferences = (state) => state.user.preferences;

// Reducer
export default userSlice.reducer;
