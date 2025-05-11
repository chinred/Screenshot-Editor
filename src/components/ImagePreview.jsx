import React, { useRef, useEffect } from "react";
import { useDebounce } from "../hook/useDebounce"; // 디바운스 훅 분리된 경우

const ImagePreview = ({
  image,
  width,
  height,
  padding,
  radius,
  shadow,
  bgType,
  bgColor,
  gradientFrom,
  gradientTo,
}) => {
  const canvasRef = useRef(null);

  // 디바운스된 값으로 렌더링 최적화
  const debouncedRadius = useDebounce(radius, 50);
  const debouncedShadow = useDebounce(shadow, 50);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 렌더링 해상도 축소 (절반)
    const renderWidth = width / 2;
    const renderHeight = height / 2;

    canvas.width = renderWidth;
    canvas.height = renderHeight;

    // 배경 처리
    if (bgType === "color") {
      ctx.fillStyle = bgColor;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, renderWidth, renderHeight);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, renderWidth, renderHeight);

    // 이미지 렌더링
    if (image) {
      const img = new Image();
      img.onload = () => {
        const availableWidth = renderWidth - padding;
        const availableHeight = renderHeight - padding;

        const imgRatio = img.width / img.height;
        let drawWidth = availableWidth;
        let drawHeight = availableWidth / imgRatio;

        if (drawHeight > availableHeight) {
          drawHeight = availableHeight;
          drawWidth = availableHeight * imgRatio;
        }

        const x = (renderWidth - drawWidth) / 2;
        const y = (renderHeight - drawHeight) / 2;

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = debouncedShadow * 0.5; // 렌더링시 그림자 부하 줄임
        ctx.beginPath();
        ctx.roundRect(x, y, drawWidth, drawHeight, debouncedRadius);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.clip();
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        ctx.restore();
      };
      img.src = image;
    }
  }, [
    image,
    width,
    height,
    padding,
    debouncedRadius,
    debouncedShadow,
    bgType,
    bgColor,
    gradientFrom,
    gradientTo,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width, // 시각적 확대
        height: height,
        borderRadius: 20,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default ImagePreview;
