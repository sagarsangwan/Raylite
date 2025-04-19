import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  code: `def my_function():
  print("Hello from a function") 
  `,
  codeLanguage: "python",
  mode: "vs-dark",
  codeFileName: "untitled",
  // codeLanguageExtension:
};

const codeEditorSlice = createSlice({
  name: "codeEditor",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
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

export const { setCodeLanguage, toggleMode, setCodeFileName, setCode } =
  codeEditorSlice.actions;
export default codeEditorSlice.reducer;
