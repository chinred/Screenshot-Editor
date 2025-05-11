import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import ControlPanel from "../components/ControlsPanel";
import PresetBackgrounds from "../components/PresetBackgrounds";
import { resizeImage } from "/utils/resizeImage"; 

const aspectRatios = {
  "16:9": { width: 800, height: 450 },
  "1:1": { width: 500, height: 500 },
  "4:5": { width: 480, height: 600 },
};

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [padding, setPadding] = useState(40);
  const [radius, setRadius] = useState(30);
  const [shadow, setShadow] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [bgType, setBgType] = useState("color");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [gradientFrom, setGradientFrom] = useState("#a1c4fd");
  const [gradientTo, setGradientTo] = useState("#c2e9fb");


  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const imageUrl = URL.createObjectURL(file); // 원본 경로 그대로 사용
    setImage(imageUrl);
    e.target.value = null;
  };

  const handleCanvasClick = () => {
    if (image) {
      setImage(null); // 이미지 제거
    } else {
      fileInputRef.current?.click(); // 업로드 트리거
    }
  };

  const handleDownload = () => {
    if (!image) return;
  
    const scale = 2;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const { width, height } = aspectRatios[aspectRatio];
  
    canvas.width = width * scale;
    canvas.height = height * scale;
  
    // 배경
    if (bgType === "color") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  
    const img = new Image();
    img.onload = () => {
      const availableWidth = (width - padding * 2) * scale;
      const availableHeight = (height - padding * 2) * scale;
  
      const imgRatio = img.width / img.height;
      let drawWidth = availableWidth;
      let drawHeight = availableWidth / imgRatio;
  
      if (drawHeight > availableHeight) {
        drawHeight = availableHeight;
        drawWidth = availableHeight * imgRatio;
      }
  
      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;
  
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = shadow * scale;
      ctx.beginPath();
  
      const drawRadius = radius * scale;
      ctx.roundRect(x, y, drawWidth, drawHeight, drawRadius);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.clip();
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.restore();
  
      const dataUrl = canvas.toDataURL("image/png");
      download(dataUrl, "screenshot.png");
    };
    img.src = image;
  };  

  const { width, height } = aspectRatios[aspectRatio];

  const canvasStyles = {
    width: `${width}px`,
    height: `${height}px`,
    padding: `${padding}px`,
    background:
      bgType === "color"
        ? bgColor
        : `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "20px",
    cursor: "pointer",
  };

  return (
    <div className="flex flex-row h-screen p-8 gap-10">
      {/* 옵션 패널 */}
      <div className="w-[320px] overflow-y-auto border-r pr-4">
        <ControlPanel
          padding={padding}
          setPadding={setPadding}
          radius={radius}
          setRadius={setRadius}
          shadow={shadow}
          setShadow={setShadow}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          bgType={bgType}
          setBgType={setBgType}
          bgColor={bgColor}
          setBgColor={setBgColor}
          gradientFrom={gradientFrom}
          setGradientFrom={setGradientFrom}
          gradientTo={gradientTo}
          setGradientTo={setGradientTo}
          handleDownload={handleDownload}
        />
        <PresetBackgrounds
          setBgType={setBgType}
          setGradientFrom={setGradientFrom}
          setGradientTo={setGradientTo}
          setBgColor={setBgColor} 
        />
      </div>

      {/* 캔버스 */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div ref={canvasRef} style={canvasStyles} onClick={handleCanvasClick}>
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: `${radius}px`,
                boxShadow: shadow
                  ? `0 10px ${shadow}px rgba(0, 0, 0, 0.3)`
                  : "none",
                transition: "all 0.3s ease-in-out", // 부드러운 전환
              }}
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              클릭하여 이미지를 업로드하세요
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
