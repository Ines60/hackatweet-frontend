import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  hash: [],
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    message: (state, action) => {
      state.value = action.payload;
    },
    addHastags: (state, action) => {
      state.value.push(action.payload);
    },
    deleteMessage: (state, action) => {
      state.value = state.value.filter((t) => t.id !== action.payload);
    },
  },
});

export const { message, addHastags } = tweetSlice.actions;
export default tweetSlice.reducer;
