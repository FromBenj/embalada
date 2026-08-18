const sunsetPalette = [
    [35, 22, 65, 255],
    [83, 34, 92, 255],
    [150, 42, 94, 255],
    [214, 64, 87, 255],
    [240, 96, 64, 255],
    [247, 147, 56, 255],
    [252, 191, 73, 255],
    [255, 229, 153, 255]
];

const phi = (1 + Math.sqrt(5)) / 2;

const customBrush = {
    type:    "default",
    weight:  3,
    scatter: 2.25,
    sharpness: 1,
    grain:     1,
    opacity: 100,
    spacing: 0.23,
    noise:   1,
    pressure: [1.2, 0.82],
    rotate:  "natural",
}
export default {
    sunsetPalette: sunsetPalette,
    phi: phi,
    brush: customBrush,
};


export function getSize(p) {
    let w = 0;
    let h = 0;
    const minWH = Math.min(p.windowWidth, p.windowHeight)*0.8;

    let aroundPhi = phi;
    while (aroundPhi === phi) {
        aroundPhi = phi * p.random(0.95, 0.99);
    }
    const maxWH = aroundPhi * minWH;
    if (minWH === p.windowWidth) {
        w = minWH;
        h = maxWH;
    } else {
        w = maxWH;
        h = minWH;
    }

    return {
        w: w,
        h: h,
        min: minWH,
        max: maxWH,
    }
}