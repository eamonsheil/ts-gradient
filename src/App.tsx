import { useState } from 'react';
import { Gradient } from './Gradient';
import { GradientConfig } from './GradientConfig';
import './styles.css';

type GradientConfig = {
    firstColor: string;
    secondColor: string;
    fillStyle: string;
    fillInterval: number;
}

const defaultObj = {
    firstColor: '',
    secondColor: '',
    fillStyle: 'iterative',
    fillInterval: 20
}

const App = () => {
    const [firstColor, setFirstColor] = useState<string>('');
    const [secondColor, setSecondColor] = useState<string>('');

    // const [configObj, setConfigObj] = useState<GradientConfig>(defaultObj);


    return (
        <>
            <h3>programatically-generated gradient. from #000 to #fff</h3>
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
            {/* <GradientConfig /> */}
            <Gradient firstColor={firstColor} secondColor={secondColor} />
        </>

    );
}

export default App;