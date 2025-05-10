import React from "react";

const presets = [
  { name: "핑크 그라디언트", from: "#fbc2eb", to: "#a6c1ee" },
  { name: "블루 스카이", from: "#a1c4fd", to: "#c2e9fb" },
  { name: "민트", from: "#d4fc79", to: "#96e6a1" },
  { name: "코랄", from: "#fda085", to: "#f6d365" },
];

const PresetBackgrounds = ({ setBgType, setGradientFrom, setGradientTo }) => {
  const applyPreset = (from, to) => {
    setBgType("gradient");
    setGradientFrom(from);
    setGradientTo(to);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        배경 프리셋 선택
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => applyPreset(preset.from, preset.to)}
            title={preset.name}
            className="h-16 rounded shadow border border-transparent hover:border-gray-600 transition"
            style={{
              background: `linear-gradient(to bottom right, ${preset.from}, ${preset.to})`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PresetBackgrounds;
