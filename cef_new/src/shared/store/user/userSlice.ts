// userSlice.js
import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  isLogged: boolean;
  id: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  role: string | undefined;
  avatar: string | undefined;
}

// Check localStorage for existing user data
const storedUser = localStorage.getItem('user');
const initialState: UserState = storedUser
  ? JSON.parse(storedUser)
  : {
      isLogged: false,
      id: undefined,
      name: undefined,
      surname: undefined,
      email: undefined,
      role: undefined,
      avatar: undefined,
    };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;

      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.isLogged = false;
      state.id = undefined;
      state.name = undefined;
      state.surname = undefined;
      state.email = undefined;
      state.role = undefined;
      state.avatar = undefined;

      // Clear user data from localStorage
      localStorage.removeItem('user');
    },
  },
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;
