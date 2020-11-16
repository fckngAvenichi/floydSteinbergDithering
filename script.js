var img;

function preload() {
    img = loadImage('src/7.jpg');
}

function setup() {
    let picWidth = 616;
    let picHeight = 353;

    createCanvas(picWidth, picHeight);
    image(img, 0, 0, picWidth, picHeight);
}

function draw() {
    loadPixels();
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let oldR = getRedAtXY(x, y, width);
            let oldG = getGreenAtXY(x, y, width);
            let oldB = getBlueAtXY(x, y, width);

            let factor = 1;

            let newR = getNewColor(oldR, factor);
            let newG = getNewColor(oldG, factor);
            let newB = getNewColor(oldB, factor);

            let errR = getColorError(oldR, newR);
            let errG = getColorError(oldG, newG);
            let errB = getColorError(oldB, newB);

            setColorsAtXY(x, y, width, newR, newG, newB);

            pixels[index(x + 1, y, width)]         += errR * 7 / 16.0;
            pixels[index(x + 1, y, width) + 1]     += errG * 7 / 16.0;
            pixels[index(x + 1, y, width) + 2]     += errB * 7 / 16.0;

            pixels[index(x - 1, y + 1, width)]     += errR * 3 / 16.0;
            pixels[index(x - 1, y + 1, width) + 1] += errG * 3 / 16.0;
            pixels[index(x - 1, y + 1, width) + 2] += errB * 3 / 16.0;

            pixels[index(x, y + 1, width)]         += errR * 5 / 16.0;
            pixels[index(x, y + 1, width) + 1]     += errG * 5 / 16.0;
            pixels[index(x, y + 1, width) + 2]     += errB * 5 / 16.0;

            pixels[index(x + 1, y + 1, width)]     += errR * 1 / 16.0;
            pixels[index(x + 1, y + 1, width) + 1] += errG * 1 / 16.0;
            pixels[index(x + 1, y + 1, width) + 2] += errB * 1 / 16.0;
        }
    }
    updatePixels();
    filter(GRAY);
    //image(img, 450, 0, 450, 450);

}

function index(x, y, awidth) {
    return (x + y * awidth) * 4;
}

function getRedAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth)];
}

function getGreenAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth) + 1];
}

function getBlueAtXY(x, y, awidth) {
    return pixels[index(x, y, awidth) + 2];
}

function setColorsAtXY(x, y, awidth, r, g ,b) {
    pixels[index(x, y, awidth)] = r;
    pixels[index(x, y, awidth) + 1] = g;
    pixels[index(x, y, awidth) + 2] = b;
}

function getNewColor(oldCol, factor) {
    return round(factor * oldCol / 256) * (256 / factor);
}

function getColorError(oldCol, newCol) {
    return oldCol - newCol;
}