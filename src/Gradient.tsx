import { useRef, useState } from 'react';
import { useWindowSize } from './hooks/useWindowSize';

export interface IGradientProps {
    secondColor: string
    firstColor: string
}

export function Gradient({ firstColor, secondColor }: IGradientProps) {
    const [width, height] = useWindowSize();
    const [fillStyle, setFillStyle] = useState('iterative');
    const [fillInterval, setFillInterval] = useState<number>(20);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const redVal = firstColor.substring(0, 2);
    const greenVal = firstColor.substring(2, 4);
    const blueVal = firstColor.substring(4, 6);

    const diffRed = parseInt(secondColor.substring(0, 2), 16) - parseInt(redVal, 16);
    const diffGreen = parseInt(secondColor.substring(2, 4), 16) - parseInt(greenVal, 16);
    const diffBlue = parseInt(secondColor.substring(4, 6), 16) - parseInt(blueVal, 16);

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
        const currColor = `rgb(
            ${x}
        )`

        // ctx?.fillStyle = currColor
        ctx?.fillRect(x * 2, y * 2, 2, 2)


        fill(ctx, x + 2, y + 2, currColor);
    }
    function fillFromCenter(ctx: CanvasRenderingContext2D | null, x: number, y: number, hexVal: string, numBoxes: number, boxSize: number): void {
        console.log("x: ", x)
        console.log("y: ", y)
        console.log("numBoxes: ", numBoxes)
        console.log("hexVal: ", hexVal)

        ctx.fillStyle = `rgb(
            ${"ff"},
                  ${"ee"},
                  0)
        )`

        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
    }


    function drawGradient(drawStyle: string): void {
        if (firstColor.length < 6 || secondColor.length < 6) {
            // throw new Error('incompatible input');
            console.log('incompatible input')
        }

        const ctx = canvasRef.current.getContext('2d');

        // clear canvas before generating new gradient
        ctx?.clearRect(0, 0, canvasSize, canvasSize);

        if (drawStyle === "iterative") {
            const boxSize = canvasSize / fillInterval;
            for (let i = 0; i < fillInterval; i++) {
                for (let j = 0; j < fillInterval; j++) {
                    ctx.fillStyle = `rgb(
                  ${Math.floor(255 - 42.5 * i)},
                  ${Math.floor(255 - 42.5 * j)},
                  0)`;
                    ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize);
                }
            }
        }

        if (drawStyle === "recursive") {
            let center: number;
            let boxSize: number;

            if (fillInterval % 2 === 0) {
                center = Math.floor((fillInterval - 1) / 2);
                boxSize = canvasSize / (fillInterval - 1);

                fillFromCenter(ctx, center, center, firstColor, fillInterval - 1, boxSize);
            }
            else {
                center = Math.floor(fillInterval / 2);
                boxSize = canvasSize / fillInterval;

                fillFromCenter(ctx, center, center, firstColor, fillInterval, boxSize);
            }

            // const center = Math.floor(canvasSize / 2)



        }

    }


    return (
        <div className='gradient-container'>
            <br />
            <label htmlFor="fillStyle">Fill Style:
                <select name="fillStyle" id="fillStyle" onChange={e => setFillStyle(e.target.value)}>
                    <option value="iterative">iterative</option>
                    <option value="recursive">recursive</option>
                </select>
            </label>
            <div>
                <label htmlFor="slider">Smoothness of gradient
                    <input type="range" name="slider" id="" min="10" max="40" value={fillInterval} onChange={e => setFillInterval(parseInt(e.target.value))} />
                </label>
            </div>
            <button onClick={() => drawGradient(fillStyle)}>Generate Gradient</button>

            <canvas width={canvasSize} height={canvasSize}
                style={{
                    border: "1px solid black"
                }}
                ref={canvasRef}
            />
        </div>
    );
}
