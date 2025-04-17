import { configureStore } from "@reduxjs/toolkit";
import codeReducer from "../features/code/codeSlice";
export default configureStore({
  reducer: {
    code: codeReducer,
  },
});
