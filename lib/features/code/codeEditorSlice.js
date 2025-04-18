import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  codeLanguage: "python",
  mode: "vs-dark",
  codeFileName: "untitled",
  // codeLanguageExtension:
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
    setCodeFileName: (state, action) => {
      state.codeFileName = action.payload;
    },
  },
});

export const { setCodeLanguage, toggleMode, setCodeFileName } =
  codeEditorSlice.actions;
export default codeEditorSlice.reducer;
