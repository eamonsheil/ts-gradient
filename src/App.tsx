import * as React from 'react';
import { Gradient } from './Gradient';
import './styles.css';

const App = () => {
    return (
        <div>
            <h1>This is objectively more useful than create-react-app</h1>
            <h3>programatically-generated gradient. from #000 to #fff</h3>
            <Gradient />
        </div>

    );
}

export default App;