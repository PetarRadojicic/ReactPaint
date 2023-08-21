// Import required modules and styles
import React, { useState, useRef, useEffect } from 'react';
import styles from './Canvas.module.css';

// Define the Canvas component
const Canvas = () => {
  // Create a reference to the canvas element
  const canvasRef = useRef(null);
  
  // Set up state variables
  const [ctx, setCtx] = useState(null); // Context for drawing on the canvas
  const [drawing, setDrawing] = useState(false); // Flag to indicate if drawing is in progress
  const [color, setColor] = useState('#000000'); // Current drawing color
  const [size, setSize] = useState(5); // Current drawing size

  // Set up the canvas context and settings when color or size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.lineCap = 'round'; // Set line cap style
      context.lineJoin = 'round'; // Set line join style
      context.strokeStyle = color; // Set drawing color
      context.lineWidth = size; // Set drawing size
      setCtx(context); // Store the context in state
    }
  }, [color, size]);

  // Start drawing when mouse is pressed down
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath(); // Start a new drawing path
    ctx.moveTo(offsetX, offsetY); // Move the "pen" to the starting point
    setDrawing(true); // Set drawing flag to true
  };

  // Draw when mouse is moved while pressed down
  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY); // Draw a line to the current position
    ctx.stroke(); // Apply the stroke to render the line
  };

  // End drawing when mouse is released
  const endDrawing = () => {
    if (drawing) {
      ctx.closePath(); // Close the drawing path
      setDrawing(false); // Set drawing flag to false
    }
  };

  // Render the Canvas component
  return (
    <div className={styles.canvasContainer}>
      {/* Canvas element for drawing */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        width={window.innerWidth * 0.9} // Set canvas width
        height={window.innerHeight * 0.7} // Set canvas height
      />
      {/* Controls for choosing color and size */}
      <div className={styles.controls}>
        {/* Color picker input */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.colorPicker}
        />
        {/* Size slider input */}
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

// Export the Canvas component as the default export
export default Canvas;
