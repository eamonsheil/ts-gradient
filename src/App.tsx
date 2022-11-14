import { useState } from 'react';
import { Gradient } from './Gradient';
import { GradientConfig } from './GradientConfig';
import './styles.css';


const defaultFirst: ColorObj = {
    hex: 'ffffff',
    rgb: {
        r: 255,
        g: 255,
        b: 255,
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
    const [fillStyle, setFillStyle] = useState('iterative');
    const [fillInterval, setFillInterval] = useState<number>(20);


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