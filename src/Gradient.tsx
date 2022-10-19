import * as React from 'react';

export interface IGradientProps {
    placeholder?: undefined;
}

export function Gradient() {

    const firstColor = '000000';
    const lastColor = '0000ff';


    const createGradient = (): React.ReactNode => {
        const firstAsInt = parseInt(firstColor, 16)
        const lastAsInt = parseInt(lastColor, 16)

        const difference = lastAsInt - firstAsInt
        const interval = Math.ceil((difference / 100))



        console.log('hex: ', firstAsInt.toString(16))
        console.log(parseInt(lastColor, 16))

        const hexArray = []
        for (let i = firstAsInt; i < lastAsInt; i += interval) {
            let hexVal = ''

            // increment Red
            const redVal = parseInt(firstColor.substring(0, 2)) + i
            hexVal += redVal;
            console.log('redVal: ', redVal)
            console.log(i.toString(16))


            // increment Green
            const greenVal = parseInt(firstColor.substring(2, 4)) + i * 3
            hexVal += greenVal;



            // increment Blue
            const blueVal = parseInt(firstColor.substring(4, 6)) + i
            hexVal += blueVal

            hexArray.push(hexVal)
            // debugger
        }
        console.log('firstAsInt: ', firstAsInt)
        console.log('lastAsInt: ', lastAsInt)
        console.log('difference: ', difference)
        console.log('interval: ', interval)

        hexArray.push(lastAsInt)
        console.log(hexArray.length)

        return (
            hexArray.map((num, idx) => {
                return (
                    <div className='color-element' onClick={() => console.log(num)} key={idx} style={{
                        'backgroundColor': `#${num.toString(16)}`,
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
            {createGradient()}
        </div>
    );
}
