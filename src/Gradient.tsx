import { useRef } from 'react';
import { useWindowSize } from './hooks/useWindowSize';

export interface IGradientProps {
    secondColor: string
    firstColor: string
}

export function Gradient({ firstColor, secondColor }: IGradientProps) {
    const [width, height] = useWindowSize();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const redVal = firstColor.substring(0, 2);
    const greenVal = firstColor.substring(2, 4);
    const blueVal = firstColor.substring(4, 6);

    const diffRed = parseInt(secondColor.substring(0, 2), 16) - parseInt(redVal, 16);
    const diffGreen = parseInt(secondColor.substring(2, 4), 16) - parseInt(greenVal, 16);
    const diffBlue = parseInt(secondColor.substring(4, 6), 16) - parseInt(blueVal, 16);


    console.log('redVal: ', redVal)
    console.log('greenVal: ', greenVal)
    console.log('blueVal: ', blueVal)


    let canvasSize = Math.floor(height * .8);
    // if the canvas size overflows the window width, the new size will be calculated in relation to width rather than height
    if (canvasSize > width) {
        canvasSize = Math.floor(width * .8);
    }



    function fill(ctx: CanvasRenderingContext2D | null, x: number, y: number, hexVal: string): void {
        console.log("x: ", x)
        console.log("max: ", canvasSize)
        if (x > canvasSize - 1 || y > canvasSize - 1) {
            console.log('done')
            return;
        }
        let currColor = `rgb(
            ${x}
        )`

        // ctx?.fillStyle = 
        ctx?.fillRect(x * 2, y * 2, 2, 2)


        fill(ctx, x + 2, y + 2, currColor);
    }

    function drawGradient(): void {
        if (firstColor.length < 6 || secondColor.length < 6) {
            // throw new Error('incompatible input');
            console.log('incompatible input')
        }


        const ctx = canvasRef.current.getContext('2d');

        const interval = canvasSize / 20;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                ctx.fillStyle = `rgb(
                  ${Math.floor(255 - 42.5 * i)},
                  ${Math.floor(255 - 42.5 * j)},
                  0)`;
                ctx.fillRect(j * interval, i * interval, 25, 25);
            }
        }

        // fill(ctx, 1, 1, firstColor);


    }


    return (
        <div className='gradient-container'>
            <p>Gradient from #{firstColor} to #{secondColor}</p>
            <br />
            <button onClick={() => drawGradient()}>Generate Gradient</button>

            <canvas width={canvasSize} height={canvasSize}
                style={{
                    border: "1px solid black"
                }}
                ref={canvasRef}
            />
        </div>
    );
}
