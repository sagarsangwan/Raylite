import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../features/code/codeEditorSlice";
export default configureStore({
  reducer: {
    codeEditor: codeReducer,
  },
});
