import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: `def my_function():
  print("Hello from a function") 
  `,
  codeLanguage: "python",
  mode: "dark",
  codeFileName: "untitled",
  editorWidth: 320,
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
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setCodeFileName: (state, action) => {
      state.codeFileName = action.payload;
    },
    setEditorWidth: (state, action) => {
      state.editorWidth = action.payload;
    },
  },
});

export const {
  setCodeLanguage,
  setMode,
  setCodeFileName,
  setCode,
  setEditorWidth,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
