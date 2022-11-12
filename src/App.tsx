import { useState } from 'react';
import { ColorObj } from './declarations';
import { Gradient } from './Gradient';
import { GradientConfig } from './GradientConfig';
import './styles.css';


const App = () => {
    const [firstColor, setFirstColor] = useState<ColorObj>({});
    const [secondColor, setSecondColor] = useState<ColorObj>({});
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