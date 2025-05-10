// components/AspectRatioSelector.jsx
import React from "react";

const AspectRatioSelector = ({ aspectRatio, setAspectRatio, aspectRatios }) => (
  <label className="flex justify-between">
    비율 선택
    <select
      value={aspectRatio}
      onChange={(e) => setAspectRatio(e.target.value)}
      className="border p-1 rounded"
    >
      {Object.keys(aspectRatios).map((key) => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>
  </label>
);

export default AspectRatioSelector;
