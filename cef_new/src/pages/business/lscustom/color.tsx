import React, { useEffect, useRef, useState } from 'react';
import './color.css';
import { executeClient } from '#/shared/api/rage';
import {colorLists} from "./colors"
import tinycolor from 'tinycolor2';

interface ColorPickerProps {
  title?: string;
  lists?: number;
}




const ColorPicker: React.FC<ColorPickerProps> = ({ title = "", lists = 0 }) => {
  // State variables
  const [currentColor, setCurrentColor] = useState<any>(null);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(1);
  const [lightness, setLightness] = useState<number>(0.5);
  const [redValue, setRedValue] = useState<number>(0);
  const [greenValue, setGreenValue] = useState<number>(0);
  const [blueValue, setBlueValue] = useState<number>(0);

  // Refs for DOM elements
  const swatchesRef = useRef<HTMLDivElement>(null);
  const colorIndicatorRef = useRef<HTMLDivElement>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectrumCursorRef = useRef<HTMLDivElement>(null);
  const hueCanvasRef = useRef<HTMLCanvasElement>(null);
  const hueCursorRef = useRef<HTMLDivElement>(null);
  const redInputRef = useRef<HTMLInputElement>(null);
  const greenInputRef = useRef<HTMLInputElement>(null);
  const blueInputRef = useRef<HTMLInputElement>(null);

  // Refs for canvas contexts and dimensions
  const spectrumCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const hueCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const spectrumRectRef = useRef<DOMRect | null>(null);
  const hueRectRef = useRef<DOMRect | null>(null);
  
  // Initialize color picker
  useEffect(() => {
    // Initialize canvas contexts
    if (spectrumCanvasRef.current) {
      spectrumCtxRef.current = spectrumCanvasRef.current.getContext('2d');
      spectrumRectRef.current = spectrumCanvasRef.current.getBoundingClientRect();
    }
    
    if (hueCanvasRef.current) {
      hueCtxRef.current = hueCanvasRef.current.getContext('2d');
      hueRectRef.current = hueCanvasRef.current.getBoundingClientRect();
    }

    // Initialize color picker components
    createShadeSpectrum();
    createHueSpectrum();

    // Set initial color values
    if (redInputRef.current && greenInputRef.current && blueInputRef.current) {
      setRedValue(parseInt(redInputRef.current.value));
      setGreenValue(parseInt(greenInputRef.current.value));
      setBlueValue(parseInt(blueInputRef.current.value));
    }

    // Refresh element rects on window resize
    const handleResize = () => {
      if (spectrumCanvasRef.current) {
        spectrumRectRef.current = spectrumCanvasRef.current.getBoundingClientRect();
      }
      if (hueCanvasRef.current) {
        hueRectRef.current = hueCanvasRef.current.getBoundingClientRect();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Create shade spectrum canvas
  const createShadeSpectrum = (color = '#f00') => {
    if (!spectrumCanvasRef.current || !spectrumCtxRef.current) return;
    
    const canvas = spectrumCanvasRef.current;
    const ctx = spectrumCtxRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Base color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // White gradient (horizontal)
    const whiteGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    whiteGradient.addColorStop(0, "#fff");
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Black gradient (vertical)
    const blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    blackGradient.addColorStop(0, "transparent");
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Create hue spectrum canvas
  const createHueSpectrum = () => {
    if (!hueCanvasRef.current || !hueCtxRef.current) return;
    
    const canvas = hueCanvasRef.current;
    const ctx = hueCtxRef.current;
    
    const hueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
    hueGradient.addColorStop(0.17, "hsl(298.8, 100%, 50%)");
    hueGradient.addColorStop(0.33, "hsl(241.2, 100%, 50%)");
    hueGradient.addColorStop(0.50, "hsl(180, 100%, 50%)");
    hueGradient.addColorStop(0.67, "hsl(118.8, 100%, 50%)");
    hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
    hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
    
    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Helper functions for color manipulation
  const colorToHue = (color: any) => {
    color = tinycolor(color);
    const hueString = tinycolor(`hsl ${color.toHsl().h} 1 .5`).toHslString();
    return hueString;
  };

  const colorToPos = (color: any) => {
    if (!spectrumRectRef.current || !hueRectRef.current) return;
    
    color = tinycolor(color);
    const hsl = color.toHsl();
    const newHue = hsl.h;
    setHue(newHue);
    
    const hsv = color.toHsv();
    const x = spectrumRectRef.current.width * hsv.s;
    const y = spectrumRectRef.current.height * (1 - hsv.v);
    const hueY = hueRectRef.current.height - ((newHue / 360) * hueRectRef.current.height);
    
    updateSpectrumCursor(x, y);
    updateHueCursor(hueY);
    setCurrentColorState(color);
    createShadeSpectrum(colorToHue(color));
  };

  // Update color state and send to client
  const setCurrentColorState = (color: any) => {
    color = tinycolor(color);
    setCurrentColor(color);
    
    if (colorIndicatorRef.current) {
      colorIndicatorRef.current.style.backgroundColor = color.toString();
    }
    
    if (spectrumCursorRef.current) {
      spectrumCursorRef.current.style.backgroundColor = color.toString();
    }
    
    if (hueCursorRef.current) {
      hueCursorRef.current.style.backgroundColor = `hsl(${color.toHsl().h}, 100%, 50%)`;
    }
    
    const rgbColor = color.toRgb();
    executeClient('client.custom.color', rgbColor.r, rgbColor.g, rgbColor.b);
    
    // Update RGB input values
    setRedValue(rgbColor.r);
    setGreenValue(rgbColor.g);
    setBlueValue(rgbColor.b);
  };

  // Update cursor positions
  const updateSpectrumCursor = (x: number, y: number) => {
    if (spectrumCursorRef.current) {
      spectrumCursorRef.current.style.left = `${x}px`;
      spectrumCursorRef.current.style.top = `${y}px`;
    }
  };

  const updateHueCursor = (y: number) => {
    if (hueCursorRef.current) {
      hueCursorRef.current.style.top = `${y}px`;
    }
  };

  // Event handlers for spectrum and hue selection
  const handleSpectrumMouseDown = (e: React.MouseEvent) => {
    getSpectrumColor(e);
    
    if (spectrumCursorRef.current) {
      spectrumCursorRef.current.classList.add('dragging');
    }
    
    window.addEventListener('mousemove', handleSpectrumMouseMove);
    window.addEventListener('mouseup', handleSpectrumMouseUp);
  };

  const handleSpectrumMouseMove = (e: MouseEvent) => {
    getSpectrumColor(e);
  };

  const handleSpectrumMouseUp = () => {
    if (spectrumCursorRef.current) {
      spectrumCursorRef.current.classList.remove('dragging');
    }
    
    window.removeEventListener('mousemove', handleSpectrumMouseMove);
    window.removeEventListener('mouseup', handleSpectrumMouseUp);
  };

  const getSpectrumColor = (e: MouseEvent | React.MouseEvent) => {
    if (!spectrumRectRef.current) return;
    
    e.preventDefault();
    
    const rect = spectrumRectRef.current;
    let x = e.pageX - rect.left;
    let y = e.pageY - rect.top;
    
    // Constrain values
    if (x > rect.width) x = rect.width;
    if (x < 0) x = 0;
    if (y > rect.height) y = rect.height;
    if (y < 0) y = 0.1;
    
    // Convert between hsv and hsl
    const xRatio = x / rect.width * 100;
    const yRatio = y / rect.height * 100;
    const hsvValue = 1 - (yRatio / 100);
    const hsvSaturation = xRatio / 100;
    
    const newLightness = (hsvValue / 2) * (2 - hsvSaturation);
    const newSaturation = (hsvValue * hsvSaturation) / (1 - Math.abs(2 * newLightness - 1));
    
    setLightness(newLightness);
    setSaturation(newSaturation);
    
    const color = tinycolor(`hsl ${hue} ${newSaturation} ${newLightness}`);
    setCurrentColorState(color);
    updateSpectrumCursor(x, y);
  };

  const handleHueMouseDown = (e: React.MouseEvent) => {
    getHueColor(e);
    
    if (hueCursorRef.current) {
      hueCursorRef.current.classList.add('dragging');
    }
    
    window.addEventListener('mousemove', handleHueMouseMove);
    window.addEventListener('mouseup', handleHueMouseUp);
  };

  const handleHueMouseMove = (e: MouseEvent) => {
    getHueColor(e);
  };

  const handleHueMouseUp = () => {
    if (hueCursorRef.current) {
      hueCursorRef.current.classList.remove('dragging');
    }
    
    window.removeEventListener('mousemove', handleHueMouseMove);
    window.removeEventListener('mouseup', handleHueMouseUp);
  };

  const getHueColor = (e: MouseEvent | React.MouseEvent) => {
    if (!hueRectRef.current) return;
    
    e.preventDefault();
    
    const rect = hueRectRef.current;
    let y = e.pageY - rect.top;
    
    // Constrain values
    if (y > rect.height) y = rect.height;
    if (y < 0) y = 0;
    
    const percent = y / rect.height;
    const newHue = 360 - (360 * percent);
    
    setHue(newHue);
    
    const hueColor = tinycolor(`hsl ${newHue} 1 .5`).toHslString();
    const color = tinycolor(`hsl ${newHue} ${saturation} ${lightness}`).toHslString();
    
    createShadeSpectrum(hueColor);
    updateHueCursor(y);
    setCurrentColorState(color);
  };

  // Handle RGB input changes
  const handleRgbChange = (r = redValue, g = greenValue, b = blueValue) => {
    const color = tinycolor(`rgb ${r} ${g} ${b}`);
    colorToPos(color);
  };

  // Create swatch buttons
  const renderSwatches = () => {
    const currentList = colorLists[lists] || colorLists[0];
    
    return currentList.map((color, index) => (
      <button
        key={index}
        className="swatch"
        title={color}
        style={{ backgroundColor: color }}
        onClick={() => handleSwatchClick(color, index)}
      />
    ));
  };

  const handleSwatchClick = (color: string, index: number) => {
    if (lists === 0) {
      const parsedColor = tinycolor(color);
      colorToPos(parsedColor);
    } else {
      executeClient('client.custom.coloritem', index);
    }
  };

  return (
    <div 
      className={`color-picker-panel ${lists ? 'big' : ''}`}
      onMouseEnter={() => executeClient("client.camera.toggled", false)}
      onMouseLeave={() => executeClient("client.camera.toggled", true)}
    >
      <h2 className="panel-header top">{title}</h2>
      <div className="panel-row">
        <div className={`swatches default-swatches ${lists === 0 ? '' : 'big' + lists}`}>
          {renderSwatches()}
        </div>
        {lists === 0 && (
          <div id="color-indicator" ref={colorIndicatorRef} className="color-button preview"></div>
        )}
      </div>
      
      {lists === 0 && (
        <>
          <div className="panel-row mrt-18">
            <div className="spectrum-map">
              <div 
                id="spectrum-cursor" 
                ref={spectrumCursorRef}
                className="color-cursor"
              ></div>
              <canvas 
                id="spectrum-canvas" 
                ref={spectrumCanvasRef}
                width="200" 
                height="200"
                onMouseDown={handleSpectrumMouseDown}
              ></canvas>
            </div>
            <div className="hue-map">
              <div 
                id="hue-cursor" 
                ref={hueCursorRef}
                className="color-cursor"
              ></div>
              <canvas 
                id="hue-canvas" 
                ref={hueCanvasRef}
                width="30" 
                height="200"
                onMouseDown={handleHueMouseDown}
              ></canvas>
            </div>
          </div>
          
          <div className="panel-row mrt-18">
            <div id="rgb-fields" className="field-group value-fields rgb-fields active">
              <div className="field-group">
                <label className="field-label">R:</label>
                <input 
                  type="number" 
                  max="255" 
                  min="0" 
                  id="red" 
                  ref={redInputRef}
                  className="field-input rgb-input"
                  value={redValue}
                  onChange={(e) => {
                    setRedValue(parseInt(e.target.value));
                    handleRgbChange(parseInt(e.target.value), greenValue, blueValue);
                  }}
                />
              </div>
              <div className="field-group">
                <label className="field-label">G:</label>
                <input 
                  type="number" 
                  max="255" 
                  min="0" 
                  id="green" 
                  ref={greenInputRef}
                  className="field-input rgb-input"
                  value={greenValue}
                  onChange={(e) => {
                    setGreenValue(parseInt(e.target.value));
                    handleRgbChange(redValue, parseInt(e.target.value), blueValue);
                  }}
                />
              </div>
              <div className="field-group">
                <label className="field-label">B:</label>
                <input 
                  type="number" 
                  max="255" 
                  min="0" 
                  id="blue" 
                  ref={blueInputRef}
                  className="field-input rgb-input"
                  value={blueValue}
                  onChange={(e) => {
                    setBlueValue(parseInt(e.target.value));
                    handleRgbChange(redValue, greenValue, parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;