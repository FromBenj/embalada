export default function download(p, canvas) {
    p.keyPressed = () => {
        if (p.key === 's' || p.key === 'S') {
            p.saveCanvas(canvas, 'explosion', 'png');
        }
    };
}