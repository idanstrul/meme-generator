'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', onResizeWindow)
}

function onResizeWindow() {
    console.log('Resizing!');
    const elCanvasContainer = document.querySelector('.canvas-container');
    const elEditor = document.querySelector('.editor')
    gElCanvas.width = elCanvasContainer.offsetWidth;
    if (window.innerWidth > 510) {
        elEditor.classList.remove('flex-center-column')
        elEditor.classList.add('flex-main')
    } else{
        elEditor.classList.remove('flex-main')
        elEditor.classList.add('flex-center-column')
    }
}

function renderMeme() {
    const meme = getMeme();
    const memeImg = getImgById(meme.selectedImgId);
    const selectedLine = meme.lines[meme.selectedLineIdx];
    var img = new Image();
    img.src = memeImg.url;
    img.onload = () => {
        drawImg(img);
        meme.lines.forEach(line =>
            drawText(line.txt, line.size, line.strokeColor, line.fillColor)
        )
    }
    document.querySelector('.meme-text').value = selectedLine.txt;
    document.querySelector('.stroke-color').value = selectedLine.strokeColor;
    document.querySelector('.fill-color').value = selectedLine.fillColor;

}

function drawImg(img/* Url */) {
    // var img = new Image();
    // img.src = imgUrl;
    // img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // };
}

function drawText(textStr, size, strokeColor, fillColor) {
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.font = `${size}px Arial`;
    gCtx.strokeText(textStr, 50, 50)
    gCtx.fillText(textStr, 50, 50)
}


function onUpdateText(elTextInput) {
    var newText = elTextInput.value;
    setLineText(newText)
    renderMeme()
}

function onSetFontSize(diff) {
    setFontSize(diff);
    renderMeme();
}

function onSwitchLine() {
    switchLine();
    renderMeme();
}

function onSetStrokeColor(elColorInput){
    setStrokeColor(elColorInput.value);
    renderMeme();
}

function onSetFillColor(elColorInput){
    console.log('fill');
    setFillColor(elColorInput.value);
    renderMeme();
}