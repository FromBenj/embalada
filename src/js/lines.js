export function drawLines(p, palette, size) {
    const width = size?.w;
    const height = size?.h;
    if (!p || !palette || !width || !height) return;

    for (let i = 0; i < 60; i++) {
        let x1 = width / 2;
        let y1 = height / 2;
        let x2 = p.random(-0.1, 1.1 * width);
        let y2 = p.random(-0.2 * height / 2, 1.2 * height);
        p.stroke(p.random(palette));

        let dx = x2 - x1;
        let dy = y2 - y1;
        let len = p.sqrt(dx * dx + dy * dy);

        for (let t = 0; t < 1; t += 0.02) {
            let x = p.lerp(x1, x2, t);
            let y = p.lerp(y1, y2, t);

            let curve = p.map(
                p.noise(i * 0.2, t * 8),
                0, 1,
                -15, 15
            );

            x += (-dy / len) * curve;
            y += (dx / len) * curve;

            let nextT = t + 0.02;
            let nextX = p.lerp(x1, x2, nextT);
            let nextY = p.lerp(y1, y2, nextT);

            let weight = p.lerp(5, p.random(15, 20), t);

            p.strokeWeight(weight);
            p.line(x, y, nextX, nextY);
        }
    }
}