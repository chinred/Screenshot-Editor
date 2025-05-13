import React, { useState } from "react";

const gradientPresets = [
  { name: "핑크 그라디언트", from: "#fbc2eb", to: "#a6c1ee" },
  { name: "블루 스카이", from: "#a1c4fd", to: "#c2e9fb" },
  { name: "민트", from: "#d4fc79", to: "#96e6a1" },
  { name: "코랄", from: "#fda085", to: "#f6d365" },
  { name: "선셋 오렌지", from: "#ff9a9e", to: "#fad0c4" },
  { name: "보랏빛 노을", from: "#a18cd1", to: "#fbc2eb" },
  { name: "청록 그라디언트", from: "#89f7fe", to: "#66a6ff" },
  { name: "밤하늘", from: "#2c3e50", to: "#4ca1af" },
];

const solidPresets = [
  { name: "화이트", color: "#ffffff" },
  { name: "라이트 그레이", color: "#f0f0f0" },
  { name: "크림", color: "#fffbe6" },
  { name: "파스텔 블루", color: "#e0f7fa" },
  { name: "민트 그린", color: "#d0f0c0" },
  { name: "연핑크", color: "#ffe4e1" },
  { name: "라벤더", color: "#e6e6fa" },
  { name: "블랙", color: "#000000" },
];

const PresetBackgrounds = ({
  setBgType,
  setGradientFrom,
  setGradientTo,
  setBgColor, // 이 값이 없을 수도 있음 → 예외 처리 필요
}) => {
  const [tab, setTab] = useState("gradient");
  const [showAll, setShowAll] = useState(false);

  const applyGradient = (from, to) => {
    setBgType("gradient");
    setGradientFrom(from);
    setGradientTo(to);
  };

  const applySolid = (color) => {
    setBgType("color");
    if (typeof setBgColor === "function") {
      setBgColor(color);
    } else {
      console.warn("setBgColor 함수가 전달되지 않았습니다.");
    }
  };

  const visiblePresets = tab === "gradient" ? gradientPresets : solidPresets;
  const isMore = visiblePresets.length > 4;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">배경 프리셋 선택</h3>

      <div className="flex mb-3">
        <button
          className={`flex-1 py-1 text-sm border-b-2 ${
            tab === "gradient"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => {
            setTab("gradient");
            setShowAll(false);
          }}
        >
          그라디언트
        </button>
        <button
          className={`flex-1 py-1 text-sm border-b-2 ${
            tab === "solid"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => {
            setTab("solid");
            setShowAll(false);
          }}
        >
          단색
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {(showAll ? visiblePresets : visiblePresets.slice(0, 4)).map((preset, index) => {
          return tab === "gradient" ? (
            <button
              key={index}
              onClick={() => applyGradient(preset.from, preset.to)}
              title={preset.name}
              className="h-16 rounded shadow border border-transparent hover:border-gray-600 transition"
              style={{
                background: `linear-gradient(to bottom right, ${preset.from}, ${preset.to})`,
              }}
            />
          ) : (
            <button
              key={index}
              onClick={() => applySolid(preset.color)}
              title={preset.name}
              className="h-16 rounded shadow border border-transparent hover:border-gray-600 transition"
              style={{
                backgroundColor: preset.color,
              }}
            />
          );
        })}
      </div>

      {isMore && (
        <div className="mt-2 text-right">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showAll ? "접기" : "더보기"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PresetBackgrounds;
