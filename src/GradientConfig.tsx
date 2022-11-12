// import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';

import { ColorObj } from './declarations';


export interface IGradientConfigProps {
    firstColor: ColorObj;
    setFirstColor: React.Dispatch<React.SetStateAction<ColorObj>>;
    secondColor: ColorObj;
    setSecondColor: React.Dispatch<React.SetStateAction<ColorObj>>;
    setFillStyle: React.Dispatch<React.SetStateAction<string>>;
    fillInterval: number;
    setFillInterval: React.Dispatch<React.SetStateAction<number>>;
}


export function GradientConfig({ firstColor, setFirstColor, secondColor, setSecondColor, setFillStyle, fillInterval, setFillInterval }: IGradientConfigProps) {

    return (
        <div>
            <div className='color-selection'>
                <label>First Color:
                    <ColorPicker color={firstColor} setColor={setFirstColor} />
                </label>
                <label>Second Color:
                    <ColorPicker color={secondColor} setColor={setSecondColor} />
                </label>
            </div>

            <br />

            <label htmlFor="fillStyle">Fill Style:
                <select name="fillStyle" id="fillStyle" onChange={e => setFillStyle(e.target.value)}>
                    <option value="iterative">iterative</option>
                    <option value="recursive">recursive</option>
                </select>
            </label>

            <div>
                <label htmlFor="slider">Smoothness of gradient
                    <input
                        type="range"
                        name="slider"
                        min="10"
                        max="40"
                        value={fillInterval}
                        onChange={e => setFillInterval(parseInt(e.target.value))}
                    />
                </label>
            </div>

        </div>
    );
}
