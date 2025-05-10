// components/BackgroundPicker.jsx
import React from "react";

const BackgroundPicker = ({
  bgType,
  setBgType,
  bgColor,
  setBgColor,
  gradientFrom,
  setGradientFrom,
  gradientTo,
  setGradientTo,
}) => {
  return (
    <>
      <label className="flex justify-between">
        배경 타입
        <select
          value={bgType}
          onChange={(e) => setBgType(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="color">단색</option>
          <option value="gradient">그라디언트</option>
        </select>
      </label>

      {bgType === "color" ? (
        <label className="flex justify-between">
          배경 색상
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      ) : (
        <div className="flex justify-between items-center gap-4">
          <label className="flex items-center gap-2">
            From
            <input
              type="color"
              value={gradientFrom}
              onChange={(e) => setGradientFrom(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2">
            To
            <input
              type="color"
              value={gradientTo}
              onChange={(e) => setGradientTo(e.target.value)}
            />
          </label>
        </div>
      )}
    </>
  );
};

export default BackgroundPicker;
