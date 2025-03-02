import React, { useEffect, useRef, useState } from "react";
import "./CanvasEditor.css";

const gradients = [
  { name: "Apple Blue", value: ["#5AC8FA", "#007AFF"] },
  { name: "Apple Purple", value: ["#AF52DE", "#5856D6"] },
  { name: "Apple Red", value: ["#FF3B30", "#FF453A"] },
  { name: "Apple Green", value: ["#30D158", "#34C759"] },
  { name: "Apple Orange", value: ["#FF9500", "#FF9F0A"] },
  { name: "Apple Yellow", value: ["#FFD60A", "#FFCC00"] },
  { name: "Apple Pink", value: ["#FF2D55", "#FF375F"] },
  { name: "Apple Teal", value: ["#64D2FF", "#5AC8FA"] },
  { name: "Apple Indigo", value: ["#5E5CE6", "#5856D6"] },
  { name: "Midnight", value: ["#1C1C1E", "#2C2C2E"] },
  { name: "Sunset", value: ["#FF5E3A", "#FF2A68"] },
  { name: "Ocean", value: ["#007AFF", "#34AADC"] },
  { name: "Lime", value: ["#30D158", "#A8E06E"] },
  { name: "Gray", value: ["#cfd9df", "#e2ebf0"] },
  { name: "Transparent", value: null },
];
const aspectRatios = {
  "16:9": 16 / 9,
  "1:1": 1,
  "4:3": 4 / 3,
  "3:2": 3 / 2,
};

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [bgGradient, setBgGradient] = useState(gradients[0].value);
  const [borderRadius, setBorderRadius] = useState(20);
  const [padding, setPadding] = useState(30);
  const [boxShadow, setBoxShadow] = useState(20);
  const [inset, setInset] = useState(false);
  const [aspectRatio, setAspectRatio] = useState("16:9");

  useEffect(() => {
    drawCanvas();
  }, [bgGradient, borderRadius, padding, boxShadow, inset, image, aspectRatio]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1; // 고해상도 지원

    // 캔버스 크기 설정 (비율 유지)
    const baseWidth = 800;
    const baseHeight = baseWidth / aspectRatios[aspectRatio];

    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;
    ctx.scale(dpr, dpr); // 고해상도 적용

    // 배경 그라데이션 적용
    if (bgGradient) {
      const gradient = ctx.createLinearGradient(0, 0, baseWidth, baseHeight);
      gradient.addColorStop(0, bgGradient[0]);
      gradient.addColorStop(1, bgGradient[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, baseWidth, baseHeight);
    } else {
      ctx.clearRect(0, 0, baseWidth, baseHeight);
    }

    // 이미지 크기 조정 (원본 비율 유지)
    let imgWidth = baseWidth - padding * 2;
    let imgHeight = (image.height / image.width) * imgWidth;

    if (imgHeight > baseHeight - padding * 2) {
      imgHeight = baseHeight - padding * 2;
      imgWidth = (image.width / image.height) * imgHeight;
    }

    const x = (baseWidth - imgWidth) / 2;
    const y = (baseHeight - imgHeight) / 2;

    // Shadow 적용 (이미지에 적용됨)
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = boxShadow * 1.5;
    ctx.shadowOffsetX = inset ? 0 : 5;
    ctx.shadowOffsetY = inset ? 0 : 5;

    // 그림자 적용을 위한 배경 사각형 그리기
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + imgWidth - borderRadius, y);
    ctx.quadraticCurveTo(x + imgWidth, y, x + imgWidth, y + borderRadius);
    ctx.lineTo(x + imgWidth, y + imgHeight - borderRadius);
    ctx.quadraticCurveTo(
      x + imgWidth,
      y + imgHeight,
      x + imgWidth - borderRadius,
      y + imgHeight
    );
    ctx.lineTo(x + borderRadius, y + imgHeight);
    ctx.quadraticCurveTo(x, y + imgHeight, x, y + imgHeight - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Border Radius 적용 후 이미지 클리핑
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + imgWidth - borderRadius, y);
    ctx.quadraticCurveTo(x + imgWidth, y, x + imgWidth, y + borderRadius);
    ctx.lineTo(x + imgWidth, y + imgHeight - borderRadius);
    ctx.quadraticCurveTo(
      x + imgWidth,
      y + imgHeight,
      x + imgWidth - borderRadius,
      y + imgHeight
    );
    ctx.lineTo(x + borderRadius, y + imgHeight);
    ctx.quadraticCurveTo(x, y + imgHeight, x, y + imgHeight - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    ctx.clip();

    // 이미지 그리기
    ctx.drawImage(image, x, y, imgWidth, imgHeight);
    ctx.restore();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setImage(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "screenshot.png";
    link.click();
  };

  return (
    <div className="editor-container">
      <div className="controls-panel">
        <h1 className="title">Screenshot Editor</h1>
        <input type="file" onChange={handleFileUpload} className="file-input" />

        {/* 비율 선택 */}
        <label>Aspect Ratio</label>
        <div className="ratio-options">
          {Object.keys(aspectRatios).map((ratio) => (
            <button key={ratio} onClick={() => setAspectRatio(ratio)}>
              {ratio}
            </button>
          ))}
        </div>

        {/* 배경 선택 */}
        <label>Background</label>
        <div className="gradient-options">
          {gradients.map((gradient, index) => (
            <div
              key={index}
              className="gradient-box"
              style={{
                background: gradient.value
                  ? `linear-gradient(45deg, ${gradient.value[0]}, ${gradient.value[1]})`
                  : "transparent",
              }}
              onClick={() => setBgGradient(gradient.value)}
            />
          ))}
        </div>

        <label>Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          value={borderRadius}
          onChange={(e) => setBorderRadius(Number(e.target.value))}
        />

        <label>Padding</label>
        <input
          type="range"
          min="0"
          max="100"
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
        />

        <label>Shadow</label>
        <input
          type="range"
          min="0"
          max="50"
          value={boxShadow}
          onChange={(e) => setBoxShadow(Number(e.target.value))}
        />

        <label>
          <input
            type="checkbox"
            checked={inset}
            onChange={() => setInset(!inset)}
          />
          Inset Shadow
        </label>

        <button onClick={handleDownload} className="download-btn">
          Download
        </button>
      </div>

      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasEditor;
