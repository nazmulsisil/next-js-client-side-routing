import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'store';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
}

// Define a type for the slice state
type UserState = {
  data?: UserData;
  loading: boolean;
};

// Define the initial state using that type
const initialState: UserState = Object.freeze({
  loading: true,
});

const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    checkUser: (state): UserState => ({
      ...state,
      loading: true,
    }),
    getUser: (state): UserState => ({
      ...state,
      loading: true,
    }),
    removeUser: (state): UserState => ({
      ...state,
      loading: true,
    }),

    // checkUser, getUser, removeUser sets loading to true, and setUser only updates the state with user data and set sets loading to false.
    setUser: (
      state,
      action: PayloadAction<UserData | undefined>
    ): UserState => ({
      ...state,
      loading: false,
      data: action.payload,
    }),
  },
});

export const { getUser, setUser, removeUser, checkUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice;
