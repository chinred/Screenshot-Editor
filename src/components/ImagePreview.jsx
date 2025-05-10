import React, { useRef, useEffect } from "react";

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    // 배경
    if (bgType === "color") {
      ctx.fillStyle = bgColor;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      ctx.fillStyle = gradient;
    }
    ctx.fillRect(0, 0, width, height);

    // 이미지 렌더링
    if (image) {
      const img = new Image();
      img.onload = () => {
        const availableWidth = width - padding * 2;
        const availableHeight = height - padding * 2;

        const imgRatio = img.width / img.height;
        let drawWidth = availableWidth;
        let drawHeight = availableWidth / imgRatio;

        if (drawHeight > availableHeight) {
          drawHeight = availableHeight;
          drawWidth = availableHeight * imgRatio;
        }

        const x = (width - drawWidth) / 2;
        const y = (height - drawHeight) / 2;

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.3)";
        ctx.shadowBlur = shadow;
        ctx.beginPath();
        ctx.roundRect(x, y, drawWidth, drawHeight, radius);
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
    radius,
    shadow,
    bgType,
    bgColor,
    gradientFrom,
    gradientTo,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width,
        height: height,
        borderRadius: 20,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    />
  );
};

export default ImagePreview;
