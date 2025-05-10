// components/CanvasWrapper.jsx
import React from "react";

const CanvasWrapper = ({ children, style, canvasRef }) => {
  return (
    <div ref={canvasRef} style={style}>
      {children}
    </div>
  );
};

export default CanvasWrapper;
