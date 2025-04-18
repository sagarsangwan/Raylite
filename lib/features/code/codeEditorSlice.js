import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  codeLanguage: "python",
  mode: "vs-dark",
};

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    setCodeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
    toggleMode: (state) => {
      state.mode = state.mode === "vs-dark" ? "vs-light" : "vs-dark";
    },
  },
});

export const { setCodeLanguage, toggleMode } = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
