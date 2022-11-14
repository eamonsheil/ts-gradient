type GradientConfig = {
    fillStyle: string;
    fillInterval: number;
}

type ColorObj = {
    hex: string;
    rgb: RGBObj;
}

type RGBObj = {
    r: number,
    g: number,
    b: number,
    a?: number
}