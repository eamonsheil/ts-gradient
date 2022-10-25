import { useState } from 'react';
import { Gradient } from './Gradient';
import './styles.css';

const App = () => {
    const [firstColor, setFirstColor] = useState<string>('')
    const [secondColor, setSecondColor] = useState<string>('')


    return (
        <div>
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

            <Gradient firstColor={firstColor} secondColor={secondColor} />
        </div>

    );
}

export default App;