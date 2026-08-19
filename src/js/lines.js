export function drawLines(linesLayer, linesNbr, palette, size) {
    const width = size?.w;
    const height = size?.h;
    if (!linesLayer || !palette || !width || !height) return;

    for (let i = 0; i < linesNbr; i++) {
        let x1 = width / 2;
        let y1 = height / 2;
        let x2 = linesLayer.random(-0.1, 1.1 * width);
        let y2 = linesLayer.random(-0.2 * height / 2, 1.2 * height);
        linesLayer.stroke(linesLayer.random(palette));

        let dx = x2 - x1;
        let dy = y2 - y1;
        let len = linesLayer.sqrt(dx * dx + dy * dy);

        for (let t = 0; t < 1; t += 0.02) {
            let x = linesLayer.lerp(x1, x2, t);
            let y = linesLayer.lerp(y1, y2, t);

            let curve = linesLayer.map(
                linesLayer.noise(i * 0.2, t * 8),
                0, 1,
                -15, 15
            );

            x += (-dy / len) * curve;
            y += (dx / len) * curve;

            let nextT = t + 0.02;
            let nextX = linesLayer.lerp(x1, x2, nextT);
            let nextY = linesLayer.lerp(y1, y2, nextT);

            let weight = linesLayer.lerp(5, linesLayer.random(15, 20), t);

            linesLayer.strokeWeight(weight);
            linesLayer.line(x, y, nextX, nextY);
        }
    }
}