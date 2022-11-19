import { useRef } from 'react';
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


    function fillFromCenter(ctx: CanvasRenderingContext2D, x: number, y: number, currColor: RGBObj, numBoxes: number, boxSize: number): void {

        if (x >= numBoxes || x <= 0 
            || y >= numBoxes || y <= 0) {
            return;
        }


        ctx.fillStyle = `rgb(${currColor.r},${currColor.g},${currColor.b})`;
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        currColor = { ...currColor, r: currColor.r + Math.floor(255 / numBoxes) };
        // ctx.fillRect((x + 1) * boxSize, y * boxSize, boxSize, boxSize);
        // ctx.fillRect((x - 1) * boxSize, y * boxSize, boxSize, boxSize);
        // ctx.fillRect(x * boxSize, (y + 1) * boxSize, boxSize, boxSize);
        // ctx.fillRect(x * boxSize, (y - 1) * boxSize, boxSize, boxSize);
        
        fillFromCenter(ctx, x + 1, y, currColor, numBoxes, boxSize);
        debugger;
        fillFromCenter(ctx, x, y + 1, currColor, numBoxes, boxSize);

        // fillFromCenter(ctx, x - 1, y, currColor, numBoxes, boxSize);

        // fillFromCenter(ctx, x, y - 1, currColor, numBoxes, boxSize);

    }



    function drawIterative(ctx: CanvasRenderingContext2D): void {
        const boxSize = canvasSize / fillInterval;
        const redDiff = (firstColor.rgb.r - secondColor.rgb.r)/fillInterval
        const greenDiff = (firstColor.rgb.g - secondColor.rgb.g)/fillInterval
        const blueDiff = (firstColor.rgb.b - secondColor.rgb.b)/fillInterval

        for (let i = 0; i < fillInterval; i++) {
            for (let j = 0; j < fillInterval; j++) {
                const style = `rgb(${Math.floor(firstColor.rgb.r - redDiff * i)},${Math.floor(firstColor.rgb.g - greenDiff * j)},${Math.floor(firstColor.rgb.b - blueDiff * j)})`;
                ctx.fillStyle = style;
                ctx.fillRect(i * boxSize, j * boxSize, boxSize, boxSize);
            }
        }
    }

    function drawGradient(drawStyle: string): void {

        const res = canvasRef.current?.getContext('2d');
        // error handling for typescript compiler
        if (!res || !(res instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        const ctx: CanvasRenderingContext2D = res;

        // clear canvas before generating new gradient
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        if (drawStyle === "iterative") {
            drawIterative(ctx);
        }

        if (drawStyle === "recursive") {
            let center: number;
            let boxSize: number;


            if (fillInterval % 2 === 0) {
                center = Math.floor((fillInterval - 1) / 2);
                boxSize = canvasSize / (fillInterval - 1);

                fillFromCenter(ctx, center, center, firstColor.rgb, fillInterval - 1, boxSize);
            }
            else {
                center = Math.floor(fillInterval / 2);
                boxSize = canvasSize / fillInterval;

                fillFromCenter(ctx, center, center, firstColor.rgb, fillInterval, boxSize);
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
