import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  codeLanguage: "python",
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCodeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
  },
});

export const { setCodeLanguage } = codeSlice.actions;
export default codeSlice.reducer;
