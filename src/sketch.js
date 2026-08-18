import p5 from "p5";
import * as brush from 'p5.brush'
import {drawLines} from "./js/lines.js";
import params, {getSize} from "./js/parameters.js";
import download from "./js/download";


let canvas;

new p5((p) => {
    brush.instance(p);

    p.setup = async () => {
        const wave = await p.loadImage("/images/waves.png");
        const woman = await p.loadImage("/images/screaming-woman.png");
        const papers = await p.loadImage("/images/papers-merged.png");
        const signature = await p.loadImage('/images/signature.png');

        const size = getSize(p);
        const palette = params?.sunsetPalette?.map((c) => p.color(c));
        const brushParams = params.brush;
        if (!palette?.length || !brushParams) return;

        p.createCanvas(size.w, size.h, p.WEBGL);
        p.background(p.color(222, 210, 135));
        brush.add("explosion", brushParams);

        p.imageMode(p.CENTER);
        p.image(papers, 0,0, size.w, size.h);
        p.image(wave, 0, 0, size.min, size.min);
        const signSize = 60;
        p.image(signature, 0.5*(size.w - signSize), 0.5*(size.h- signSize), signSize, signSize);
        p.strokeCap(p.ROUND);
        drawLines(p, brush, palette, size);

        p.push();
        p.rotate(p.PI);
        p.image(woman, 0, 0, size.min * 0.75, size.min * 0.75 * woman.height / woman.width,);
        p.pop();

        download(p, canvas, size);
    };
});
