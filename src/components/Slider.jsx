// components/Slider.jsx
import React from "react";

const Slider = ({ value, onChange, min = 0, max = 100, label }) => {
  return (
    <div className="slider-container">
      <label>
        {label}: {value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
      />
    </div>
  );
};

export default Slider;
