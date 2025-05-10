import React from "react";

const LabeledSlider = ({ label, value, setValue, min = 0, max = 100 }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-700 font-medium flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
      className="w-full accent-blue-500"
    />
  </div>
);

const ControlPanel = ({
  padding,
  setPadding,
  radius,
  setRadius,
  shadow,
  setShadow,
  aspectRatio,
  setAspectRatio,
  bgType,
  setBgType,
  bgColor,
  setBgColor,
  gradientFrom,
  setGradientFrom,
  gradientTo,
  setGradientTo,
  handleDownload,
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">옵션 패널</h2>

      {/* 슬라이더 */}
      <LabeledSlider label="패딩" value={padding} setValue={setPadding} />
      <LabeledSlider label="둥글기" value={radius} setValue={setRadius} />
      <LabeledSlider label="그림자" value={shadow} setValue={setShadow} />

      {/* 캔버스 비율 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          캔버스 비율
        </label>
        <select
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
          className="w-full border rounded px-2 py-1 text-gray-700"
        >
          <option value="16:9">16:9</option>
          <option value="1:1">1:1</option>
          <option value="4:5">4:5</option>
        </select>
      </div>

      {/* 배경 타입 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          배경 타입
        </label>
        <select
          value={bgType}
          onChange={(e) => setBgType(e.target.value)}
          className="w-full border rounded px-2 py-1 text-gray-700"
        >
          <option value="color">단색</option>
          <option value="gradient">그라디언트</option>
        </select>
      </div>

      {/* 배경 색상 */}
      {bgType === "color" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            배경 색상
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-10 border rounded"
          />
        </div>
      )}

      {/* 그라디언트 색상 */}
      {bgType === "gradient" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시작 색
            </label>
            <input
              type="color"
              value={gradientFrom}
              onChange={(e) => setGradientFrom(e.target.value)}
              className="w-full h-10 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              끝 색
            </label>
            <input
              type="color"
              value={gradientTo}
              onChange={(e) => setGradientTo(e.target.value)}
              className="w-full h-10 border rounded"
            />
          </div>
        </div>
      )}

      {/* 다운로드 버튼 */}
      <button
        onClick={handleDownload}
        className="w-full mt-4 py-2 rounded font-semibold text-white bg-blue-500 hover:bg-blue-600 transition"
      >
        다운로드
      </button>
    </div>
  );
};

export default ControlPanel;
