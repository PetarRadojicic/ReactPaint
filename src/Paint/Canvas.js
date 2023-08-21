import React, { useState, useRef, useEffect } from 'react';
import styles from './Canvas.module.css';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = color;
      context.lineWidth = size;
      setCtx(context);
    }
  }, [color, size]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (drawing) {
      ctx.closePath();
      setDrawing(false);
    }
  };

  const startDrawingTouch = (e) => {
    const touch = e.touches[0];
    const offsetX = touch.clientX - touch.target.getBoundingClientRect().left;
    const offsetY = touch.clientY - touch.target.getBoundingClientRect().top;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const drawTouch = (e) => {
    if (!drawing) return;
    const touch = e.touches[0];
    const offsetX = touch.clientX - touch.target.getBoundingClientRect().left;
    const offsetY = touch.clientY - touch.target.getBoundingClientRect().top;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={endDrawing}
        onTouchCancel={endDrawing}
        width={window.innerWidth * 0.9}
        height={window.innerHeight * 0.7}
      />
      <div className={styles.controls}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.colorPicker}
        />
        <input
          type="range"
          min="1"
          max="20"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className={styles.rangeSlider}
        />
      </div>
    </div>
  );
};

export default Canvas;
