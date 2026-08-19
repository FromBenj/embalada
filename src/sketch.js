import p5 from "p5";
import {drawLines} from "./js/lines.js";
import params, {getSize} from "./js/parameters.js";
import download from "./js/download";

let canvas;

new p5((p) => {

    let size, palette;
    let papers, wave, woman, signature;
    let linesLayer;

    const drawBackground = () => {
        p.background(p.color("#fb90bba8"));
        p.imageMode(p.CENTER);
        p.image(papers, size.w / 2, size.h / 2, size.w, size.h);
        p.image(wave, size.w / 2, size.h / 2, (size.max + size.min) / 2, (size.max + size.min) / 2);
    };

    const drawWoman = () => {
        p.push();
        p.translate(size.w / 2, size.h / 2);
        p.rotate(p.PI);
        p.image(woman, 0, 0, size.min * 0.75, size.min * 0.75 * woman.height / woman.width);
        p.pop();
    };

    const drawSignature = () => {
        const signSize = 0.10 * size.min;
        const margin = signSize / 4;
        p.image(signature, size.w - signSize / 2 - margin, size.h - signSize / 2 - margin, signSize, signSize);
    };

    const refreshLines = (linesNbr) => {
        linesLayer = p.createGraphics(size.w, size.h);
        linesLayer.strokeCap(linesLayer.ROUND);
        drawLines(linesLayer, linesNbr, palette, size);

        drawBackground();

        p.push();
        p.imageMode(p.CORNER);
        p.image(linesLayer, 0, 0);
        p.pop();

        drawWoman();
        drawSignature();
    };


    p.setup = async () => {
        size = getSize(p);
        papers = await p.loadImage(import.meta.env.BASE_URL + "images/papers-merged.png");
        wave = await p.loadImage(import.meta.env.BASE_URL + "images/waves.png");
        woman = await p.loadImage(import.meta.env.BASE_URL + "images/screaming-woman.png");
        signature = await p.loadImage(import.meta.env.BASE_URL + "images/signature.png");

        p.createCanvas(size.w, size.h);
        p.background(p.color("#fb90bba8"));

        palette = params?.sunsetPalette?.map((c) => p.color(c));
        if (!palette?.length) return;

        p.imageMode(p.CENTER);
        p.image(papers, size.w / 2, size.h / 2, size.w, size.h);
        p.image(wave, size.w / 2, size.h / 2, (size.max + size.min) / 2, (size.max + size.min) / 2);

        refreshLines(linesNbr);
        download(p, canvas, size);
    };

    let lastLinesAt = 0;
    let rate = 600;
    let linesNbr = 15;

    p.draw = () => {
        if (p.millis() - lastLinesAt > rate) {
            lastLinesAt = p.millis();
            if (linesLayer) {
                linesLayer.remove();
                refreshLines(linesNbr);
                rate = rate * 0.8;
                linesNbr += 5;
                if (linesNbr >= 120) linesNbr = 120;
            }
        }
    };
});
