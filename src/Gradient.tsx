import { useRef } from 'react';
import { ColorObj } from './declarations';
import { useWindowSize } from './hooks/useWindowSize';

export interface IGradientProps {
    firstColor: ColorObj;
    secondColor: ColorObj;
    fillStyle: string;
    fillInterval: number;
}

export function Gradient({ firstColor, secondColor, fillStyle, fillInterval }: IGradientProps) {
    const [width, height] = useWindowSize();

    const canvasRef = useRef<HTMLCanvasElement>(null);



    let canvasSize = Math.floor(height * .8);

    // if the canvas size overflows the window width, the new size will be calculated in relation to width rather than height
    if (canvasSize > width) {
        canvasSize = Math.floor(width * .8);
    }

    function fillFromCenter(ctx: CanvasRenderingContext2D | null, x: number, y: number, hexVal: string, numBoxes: number, boxSize: number): void {
        // console.log("x: ", x)
        // console.log("y: ", y)
        // console.log("numBoxes: ", numBoxes)
        // console.log("hexVal: ", hexVal)


        const redVal = hexVal.substring(1, 3);
        const greenVal = hexVal.substring(3, 5);
        const blueVal = hexVal.substring(5, 7);

        console.log(redVal, greenVal, blueVal);
        debugger
        ctx.fillStyle = `rgb(
            ${firstColor.rbg.r},
            ${firstColor.rbg.g},
            ${firstColor.rbg.b}
            )`;

        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);

    }


    function drawGradient(drawStyle: string): void {

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

                fillFromCenter(ctx, center, center, firstColor.hex, fillInterval - 1, boxSize);
            }
            else {
                center = Math.floor(fillInterval / 2);
                boxSize = canvasSize / fillInterval;

                fillFromCenter(ctx, center, center, firstColor.hex, fillInterval, boxSize);
            }
        }
    }


    return (
        <div className='gradient-container'>

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
