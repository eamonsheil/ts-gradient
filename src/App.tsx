import { useState } from 'react';
import { Gradient } from './Gradient';
import { GradientConfig } from './GradientConfig';
import './styles.css';


const defaultFirst: ColorObj = {
    hex: 'BD10E0',
    rgb: {
        r: 189,
        g: 16,
        b: 224,
        a: 100
    }
}
const defaultSecond: ColorObj = {
    hex: '000000',
    rgb: {
        r: 0,
        g: 0,
        b: 0,
        a: 100
    }
}


const App = () => {
    const [firstColor, setFirstColor] = useState<ColorObj>(defaultFirst);
    const [secondColor, setSecondColor] = useState<ColorObj>(defaultSecond);
    const [fillStyle, setFillStyle] = useState('recursive');
    const [fillInterval, setFillInterval] = useState<number>(10);


    return (
        <div>
            <h3>programatically-generated gradient.</h3>
            <GradientConfig
                firstColor={firstColor}
                setFirstColor={setFirstColor}
                secondColor={secondColor}
                setSecondColor={setSecondColor}
                setFillStyle={setFillStyle}
                fillInterval={fillInterval}
                setFillInterval={setFillInterval}
            />
            <Gradient
                firstColor={firstColor}
                secondColor={secondColor}
                fillStyle={fillStyle}
                fillInterval={fillInterval}
            />
        </div>
    );
}

export default App;