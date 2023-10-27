import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../../constants";
import { actionItemClick } from "../../slice/menuItemSlice";
import { socket } from "../../socket";

const Board = () => {
  const canvasRef = useRef(null);
  const shoulDraw = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);

  const { color, size } = useSelector((state) => state.toolBox[activeMenuItem]);
  const dispatch = useDispatch();
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!canvas) return;

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const dataURL = canvas.toDataURL();
      const anchor = document.createElement("a");

      anchor.href = dataURL;
      anchor.download = "sketch.png";
      anchor.click();
    } else if (
      actionMenuItem === MENU_ITEMS.UNDO ||
      actionMenuItem === MENU_ITEMS.REDO
    ) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO)
        historyPointer.current -= 1;
      if (
        historyPointer.current < drawHistory.current.length - 1 &&
        actionMenuItem === MENU_ITEMS.REDO
      )
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shoulDraw.current = true;
      beginPath(e.clientX, e.clientY);

      socket.emit("beginPath", { x: e.clientX, y: e.clientY });
    };
    const handleMouseMove = (e) => {
      if (!shoulDraw.current) return;
      drawLine(e.clientX, e.clientY);

      socket.emit("drawLine", { x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => {
      shoulDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    const handleBeginPath = (path) => {
      console.log(path);
      beginPath(path.x, path.y);
    };

    const handleDrawLine = (path) => {
      drawLine(path.x, path.y);
    };

    socket.on("connect", () => {
      console.log("socket connected");

      socket.on("beginPath", handleBeginPath);

      socket.on("drawLine", handleDrawLine);
    });

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket.off("beginPath", handleBeginPath);
      socket.off("drawLine", handleDrawLine);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    socket.emit("changeConfig", { color, size });


    const changeConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeConfig(color, size);

    const handleConfigChange = (config) => {
      changeConfig(config.color, config.size);
    };

    socket.on("changeConfig", handleConfigChange);

    return () => {
      socket.off("changeConfig", handleConfigChange);
    };
  }, [size, color]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
