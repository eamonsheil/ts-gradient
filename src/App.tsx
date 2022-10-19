import * as React from 'react';
import { Gradient } from './Gradient';
import './styles.css';

const App = () => {
    return (
        <div>
            <h3>programatically-generated gradient. from #000 to #fff</h3>
            <label>First Color: <span>#</span>
                <input type="text" />
            </label>
            <label>Second Color: <span>#</span>
                <input type="text" />
            </label>
            <Gradient />
        </div>

    );
}

export default App;