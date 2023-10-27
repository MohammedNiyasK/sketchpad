import { configureStore } from "@reduxjs/toolkit";
import menuItemReducer from "../slice/menuItemSlice";
import toolboxReducer from "../slice/toolboxSlice";

export const store = configureStore({
  reducer: {
    menu: menuItemReducer,
    toolBox: toolboxReducer,
  },
});
