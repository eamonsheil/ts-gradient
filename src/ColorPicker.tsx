import { SetStateAction } from 'react';
import { SketchPicker } from 'react-color';
import { ColorObj } from './declarations';

export interface IColorPickerProps {
    color: ColorObj;
    setColor: SetStateAction<ColorObj>;
}

export function ColorPicker({ color, setColor }) {

    const handleChange = color => {

        setColor({ hex: color.hex, rgb: color.rgb });
    }
    console.log(color);
    return (
        <div>
            <SketchPicker color={color} onChangeComplete={handleChange} />

        </div>
    );
}
