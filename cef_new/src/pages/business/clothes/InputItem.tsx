import React, {useEffect, useRef} from 'react';
import rangeslider from "rangeslider-js"
import {executeClient} from '#api/rage';

interface InputItemProps {
    id: string;
    style?: string;
    leftText: string;
    centerText?: string;
    rightText: string;
    min: number;
    max: number;
    step: number;
    value: number;
    callback: (value: number) => void;
}

const InputItem: React.FC<InputItemProps> = ({
                                                 id,
                                                 style,
                                                 leftText,
                                                 centerText = "",
                                                 rightText,
                                                 min,
                                                 max,
                                                 step,
                                                 value,
                                                 callback,
                                             }) => {
    const sliderRef = useRef<HTMLInputElement>(null);

    // Initialize the slider
    useEffect(() => {
        const sliderInput = sliderRef.current;
        if (!sliderInput) return;

        // Check if the slider is already initialized
        if ((sliderInput as any)['rangeslider-js']) return;

        // Initialize the slider
        rangeslider.create(sliderInput, {
            min,
            max,
            value,
            step,
            onSlide: (value: number, percent: number, position: number) => {
                callback(Number(value));
                executeClient("client.camera.toggled", false);
            },
            onSlideStart: (value: number, percent: number, position: number) => {
                executeClient("client.camera.toggled", false);
            },
            onSlideEnd: (value: number, percent: number, position: number) => {
                executeClient("client.camera.toggled", true);
            },
        });
    }, [min, max, step, callback]);

    // Update the slider value when `value` prop changes
    useEffect(() => {
        const sliderInput = sliderRef.current;
        if (!sliderInput) return;

        const sliderHandle = (sliderInput as any)['rangeslider-js'];
        if (sliderHandle && value !== sliderHandle.value) {
            sliderHandle.update({value});
        }
    }, [value]);

    return (
        <div className={`slider ${style}`}>
            <input
                type="range"
                id={id}
                ref={sliderRef}
            />
            <div className="info">
                <span>{leftText}</span>
                <span>{centerText}</span>
                <span>{rightText}</span>
            </div>
        </div>
    );
};

export default InputItem;