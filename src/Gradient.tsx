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

    const colorDiffs: RGBObj = {
        r: (Math.abs(firstColor.rgb.r - secondColor.rgb.r))/fillInterval,
        g: (Math.abs(firstColor.rgb.g - secondColor.rgb.g))/fillInterval,
        b: (Math.abs(firstColor.rgb.b - secondColor.rgb.b))/fillInterval,
    }


    const dir = [
        [0,1],
        [1,0],
        [0,-1],
        [-1,0]
    ]

    function fillFromCenter(ctx: CanvasRenderingContext2D, x: number, y: number, numBoxes: number, boxSize: number, seen: boolean[][]): void {
        if ( x >= numBoxes || x < 0 
            || y  >= numBoxes || y  < 0) {
            return;
        }

        if (seen[x][y]) {
            return;
        }

        // rgb values are calculated differently depending on 
        const redVal = firstColor.rgb.r > secondColor.rgb.r ? firstColor.rgb.r - colorDiffs.r * x : firstColor.rgb.r + colorDiffs.r * x;
        const greenVal = firstColor.rgb.g > secondColor.rgb.g ? firstColor.rgb.g - colorDiffs.g * x : firstColor.rgb.g + colorDiffs.g * x;
        const blueVal = firstColor.rgb.b > secondColor.rgb.b ? firstColor.rgb.b - colorDiffs.b * y : firstColor.rgb.b + colorDiffs.b * y;

        ctx.fillStyle = `rgb(${Math.floor(redVal)},${Math.floor(greenVal)},${Math.floor(blueVal)})`;
        ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
        // debugger;

        seen[x][y] = true;

        // call function with neighboring coordinates
        for (let i = 0; i < dir.length; i++) {
            fillFromCenter(ctx, x + dir[i][0], y + dir[i][1], numBoxes, boxSize, seen);
        }
    }



    function drawIterative(ctx: CanvasRenderingContext2D): void {
        const boxSize = canvasSize / fillInterval;
    
        for (let i = 0; i < fillInterval; i++) {
            for (let j = 0; j < fillInterval; j++) {
                ctx.fillStyle = `rgb(${Math.floor(firstColor.rgb.r - colorDiffs.r * i)},${Math.floor(firstColor.rgb.g - colorDiffs.g * j)},${Math.floor(firstColor.rgb.b - colorDiffs.b * j)})`;
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
            const seen: boolean[][] = []


            if (fillInterval % 2 === 0) {
                center = Math.floor((fillInterval - 1) / 2);
                boxSize = canvasSize / (fillInterval - 1);

                for (let i = 0; i < fillInterval - 1; i++) {
                    seen.push(new Array(fillInterval - 1).fill(false))
                }

                fillFromCenter(ctx, center, center, fillInterval - 1, boxSize, seen);
            }
            else {
                center = Math.floor(fillInterval / 2);
                boxSize = canvasSize / fillInterval;
                for (let i = 0; i < fillInterval; i++) {
                    seen.push(new Array(fillInterval - 1).fill(false))
                }

                fillFromCenter(ctx, center, center, fillInterval, boxSize, seen);
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
