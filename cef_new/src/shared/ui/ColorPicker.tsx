import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerProps {
    selectedColor: string; // Expects a hex color string
    onColorChange: (color: string) => void; // Callback for color change
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
    const [color, setColor] = useState<string>(selectedColor);

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        onColorChange(newColor); // Notify parent component of the color change
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Color Picker */}
            <HexColorPicker
                color={color}
                onChange={handleColorChange}
                className="react-colorful" // Optional: Add custom styles if needed
            />

            {/* Manual Input and Preview */}
            <div className="flex items-center gap-2">
                <HexColorInput
                    color={color}
                    onChange={handleColorChange}
                    placeholder="#RRGGBB"
                    prefixed // Adds "#" prefix to the input
                    className="input input-bordered w-32 text-center"
                />
                <div
                    className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-md"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
};

export default ColorPicker;