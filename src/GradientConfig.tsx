import { useState } from 'react';
import { GradientConfig } from './App';

export interface IGradientConfigProps {
    configObj?: GradientConfig;
}


// TODO: 
// Substitute configuration code from App.tsx and Gradient.tsx with this file.



export function GradientConfig({ configObj }: IGradientConfigProps) {
    const [firstColor, setFirstColor] = useState<string>('');
    const [secondColor, setSecondColor] = useState<string>('');
    const [fillStyle, setFillStyle] = useState('iterative');
    const [fillInterval, setFillInterval] = useState<number>(20);


    return (
        <div>
            <label>First Color: <span>#</span>
                <input
                    name='firstColor'
                    type="text"
                    value={firstColor}
                    onChange={(e) => setFirstColor(e.target.value)}
                />
            </label>
            <label>Second Color: <span>#</span>
                <input
                    name='secondColor'
                    type="text"
                    value={secondColor}
                    onChange={(e) => setSecondColor(e.target.value)}
                />
            </label>

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
