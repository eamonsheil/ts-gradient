import { SketchPicker } from 'react-color';

export interface IColorPickerProps {
    color: ColorObj;
    setColor: React.Dispatch<React.SetStateAction<ColorObj>>;
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
