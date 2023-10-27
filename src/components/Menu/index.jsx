import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { menuItemClick, actionItemClick } from "../../slice/menuItemSlice";
import { MENU_ITEMS } from "../../constants";
import { socket } from "../../socket";

const Menu = () => {
  const dispatch = useDispatch();
  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
    socket.emit("menuItem", itemName);
  };

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  const handleConfigChange = (itemName) => {
    console.log(itemName);
    dispatch(menuItemClick(itemName));
  };

  useEffect(() => {
    socket.on("menuItem", handleConfigChange);

    return () => {
      socket.off("menuItem", handleConfigChange);
    };
  }, []);

  const item = useSelector((state) => state.menu.activeMenuItem);
  const iconStyle =
    "cursor-pointer flex justify-center items-center h-10 w-10 rounded-md text-xl hover:bg-slate-200 ";
  return (
    <div className="flex justify-center">
      <div className="absolute px-5 py-1 flex justify-between lg:w-1/4 w-3/4 top-10 rounded-md border border-purple-300 shadow-md   ">
        <div
          className={`${iconStyle} ${
            item === MENU_ITEMS.PENCIL ? "bg-slate-200" : ""
          }`}
          onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </div>
        <div
          className={`${iconStyle} ${
            item === MENU_ITEMS.ERASER ? "bg-slate-200" : ""
          }`}
          onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
        >
          <FontAwesomeIcon icon={faEraser} />
        </div>
        <div
          className={iconStyle}
          onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </div>
        <div
          className={iconStyle}
          onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <div
          className={iconStyle}
          onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
        >
          <FontAwesomeIcon icon={faFileArrowDown} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
