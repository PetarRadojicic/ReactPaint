import React, { useState } from "react";
import styles from "./Paint.module.css";
import Canvas from "./Canvas.js";
const Paint = () => {

  return (

    <Canvas lassName={styles.canvasContainer}/>

  );
};

export default Paint;
