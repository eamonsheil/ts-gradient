import { useState } from 'react';

export interface IGradientProps {
    secondColor: string
    firstColor: string
}

export function Gradient({ firstColor, secondColor }: IGradientProps) {
    const [showGradient, setShowGradient] = useState<boolean>(false)
    // const firstColor = '000000';
    // const lastColor = '0000ff';


    function createGradient(): React.ReactNode {

        const firstAsInt = parseInt(firstColor, 16);
        const lastAsInt = parseInt(secondColor, 16);

        const difference = lastAsInt - firstAsInt;
        const interval = (difference / 10000);



        console.log('hex: ', firstAsInt.toString(16));
        console.log(parseInt(secondColor, 16));

        const hexArray: string[] = [];

        async function init() {
            let loopCount = 0;

            for (let i = firstAsInt; i < lastAsInt; i += 1) {
                const increment = Math.round(i);

                if (loopCount > 8000) {
                    throw new Error('interval is too small and therefore creates too many loops');
                }
                loopCount++;

                let hexVal = '';

                // increment Red
                const redVal = parseInt(firstColor.substring(0, 2)) + increment;
                hexVal += redVal;
                console.log('redVal: ', redVal);
                // console.log(increment.toString(16));


                // increment Green
                const greenVal = parseInt(firstColor.substring(2, 4)) + increment * 10;
                hexVal += greenVal;


                // increment Blue
                const blueVal = parseInt(firstColor.substring(4, 6)) + increment;
                hexVal += blueVal;

                hexArray.push(hexVal);
                // debugger
            }

            console.log('firstAsInt: ', firstAsInt);
            console.log('lastAsInt: ', lastAsInt);
            console.log('difference: ', difference);
            console.log('interval: ', interval);

            // hexArray.push(lastAsInt);
            console.log(hexArray.length);
        }


        init();



        return (
            hexArray.map((num, idx) => {
                return (
                    <div className='color-element' onClick={() => console.log(num)} key={idx} style={{
                        'backgroundColor': `#${num.toString()}`,
                        'width': '3px',
                        'height': '10%',
                        // 'border': '1px solid red'
                    }}>
                    </div>
                )
            })
        )

    }


    return (
        <div className='gradient-container'>
            <p>Gradient from #{firstColor} to #{secondColor}</p>
            <br />
            <button onClick={() => setShowGradient(!showGradient)}>Generate Gradient</button>
            {showGradient ? createGradient() : null}

        </div>
    );
}
