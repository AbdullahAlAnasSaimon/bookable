// import { ISignUp } from "@/types/globalTypes";
import { auth } from "@/lib/firebase";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

/**
 * Create a new user.
 * @param {ICredential} param - The email and password of the user.
 * @returns {Promise<string>} - The email of the created user.
 */
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

/**
 * Log in an existing user.
 * @param {ICredential} param - The email and password of the user.
 * @returns {Promise<string>} - The email of the logged-in user.
 */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
  },
});

// export const { setUser } = userSlice.actions;

export default userSlice.reducer;
