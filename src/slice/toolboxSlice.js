import { createSlice } from "@reduxjs/toolkit";
import { COLORS, MENU_ITEMS } from "../constants";

const initialState = {
  [MENU_ITEMS.PENCIL]: {
    color: COLORS.BLACK,
    size: 3,
  },
  [MENU_ITEMS.ERASER]: {
    color: COLORS.WHITE,
    size: 3,
  },
};

export const tooblboxSlice = createSlice({
  name: "toolbox",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.activeItem].color = action.payload.color;
    },
    changeBrushSize: (state, action) => {
      state[action.payload.activeItem].size = action.payload.size;
    },
  },
});

export const { changeBrushSize, changeColor } = tooblboxSlice.actions;
export default tooblboxSlice.reducer;
