import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, MENU_ITEMS } from "../../constants";
import { changeColor, changeBrushSize } from "../../slice/toolboxSlice";

const Toolbox = () => {
  const activeItem = useSelector((state) => state.menu.activeMenuItem);
  const { size, color } = useSelector((state) => state.toolBox[activeItem]);
  const dispatch = useDispatch();

  const handleBrushSize = (e) => {
    dispatch(changeBrushSize({ activeItem, size: e.target.value }));
  };

  const handleChangeColor = (newColor) => {
    dispatch(changeColor({ activeItem, color: newColor }));
  };
  return (
    <div className="p-5 absolute top-1/4 left-5 w-64 rounded-md shadow-md border-purple-300 border">
      {activeItem !== MENU_ITEMS.ERASER && (
        <div>
          <h4 className="text-sm">Stroke Color</h4>
          <div className="flex justify-between mt-2">
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-black hover:border-2 border-purple-300
              ${color === COLORS.BLACK ? "border-2 border-purple-300" : ""}
              `}
              onClick={() => handleChangeColor(COLORS.BLACK)}
            />
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-red-500 hover:border-2 border-purple-300
              ${color === COLORS.RED ? "border-2 border-purple-300" : ""}
              `}
              onClick={() => handleChangeColor(COLORS.RED)}
            />
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-blue-500 hover:border-2 border-purple-300
              ${color === COLORS.BLUE ? "border-2 border-purple-300" : ""}
              `}
              onClick={() => handleChangeColor(COLORS.BLUE)}
            />
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-green-500 hover:border-2 border-purple-300
             ${color === COLORS.GREEN ? "border-2 border-purple-300" : ""}
             `}
              onClick={() => handleChangeColor(COLORS.GREEN)}
            />
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-orange-400 hover:border-2 border-purple-300
              ${color === COLORS.ORANGE ? "border-2 border-purple-300" : ""}
              `}
              onClick={() => handleChangeColor(COLORS.ORANGE)}
            />
            <div
              className={`h-5 w-5 mr-1 rounded-sm cursor-pointer bg-yellow-400 hover:border-2 border-purple-300
             ${color === COLORS.YELLOW ? "border-2 border-purple-300" : ""}
             `}
              onClick={() => handleChangeColor(COLORS.YELLOW)}
            />
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm mt-2">Brush Size</h4>
        <div className="flex justify-between mt-2">
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={size}
            onChange={handleBrushSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
