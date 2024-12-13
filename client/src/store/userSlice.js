import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null, 
  reducers: {
    setUser: (state, action) => action.payload, 
    logout: () => null,
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
