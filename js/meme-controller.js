'use strict'

var gElCanvas;
var gCtx;

function onInit(){
    renderGallery()
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', onResizeCanvas)
}

function onResizeCanvas(){
    console.log('Resizing!');
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth - 20;
}

function renderMeme(){
    const meme = getMeme();
    const memeImg = getImgById(meme.selectedImgId);
    const selectedLine = meme.lines[meme.selectedLineIdx];
    var img = new Image();
    img.src = memeImg.url;
    img.onload = () => {
        drawImg(img);
        drawText(selectedLine.txt, selectedLine.size, selectedLine.color)
    }
}

function drawImg(img/* Url */){
    // var img = new Image();
    // img.src = imgUrl;
    // img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // };
}

function drawText(textStr, size, color){
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.strokeText(textStr, 50, 50)
}


function onUpdateText(elTextInput){
    var newText = elTextInput.value;
    setLineText(newText)
    renderMeme()
}