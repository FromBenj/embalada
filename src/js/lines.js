export function drawLines(p, brush, palette, size) {
    const width = size?.w;
    const height = size?.h;
    if (!p || !palette || !width || !height) return;

    for (let i = 0; i < 80; i++) {
        let x1 = 0;
        let y1 = 0;
        let x2 = p.random(-0.5 * width, 0.5 * width);
        let y2 = p.random(-0.5 * height, 0.5 * height);
        brush.set("explosion", p.random(palette), 1);
        brush.line(x1, y1, x2, y2);
    }
}