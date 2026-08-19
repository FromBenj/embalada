import p5 from "p5";
import {drawLines} from "./js/lines.js";
import params, {getSize} from "./js/parameters.js";
import download from "./js/download";

let canvas;

new p5((p) => {
    p.setup = async () => {
        const wave = await p.loadImage(import.meta.env.BASE_URL + "images/waves.png");
        const woman = await p.loadImage(import.meta.env.BASE_URL + "images/screaming-woman.png");
        const papers = await p.loadImage(import.meta.env.BASE_URL + "images/papers-merged.png");
        const signature = await p.loadImage(import.meta.env.BASE_URL + "images/signature.png");

        const size = getSize(p);
        const palette = params?.sunsetPalette?.map((c) => p.color(c));
        if (!palette?.length) return;


        p.createCanvas(size.w, size.h);
        p.background(p.color("#fb90bba8"));
        p.imageMode(p.CENTER);
        p.image(papers, size.w / 2, size.h / 2, size.w, size.h);
        p.image(wave, size.w / 2, size.h / 2, (size.max + size.min) / 2, (size.max + size.min) / 2);

        p.strokeCap(p.ROUND);
        drawLines(p, palette, size);

        p.push();
        p.translate(size.w / 2, size.h / 2);
        p.rotate(p.PI);
        p.image(woman, 0, 0, size.min * 0.75, size.min * 0.75 * woman.height / woman.width);
        p.pop();

        const signSize = 0.10 * size.min;
        const margin = signSize / 4;
        p.image(signature, size.w - signSize / 2 - margin, size.h - signSize / 2 - margin, signSize, signSize);

        download(p, canvas, size);
    };
});
