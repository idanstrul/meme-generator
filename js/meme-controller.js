'use strict'

var gElCanvas;
var gCtx;

function renderEditor() {
    const elMain = document.querySelector('main');
    var strHTML = `
    <div class="canvas-container blank-clr">
        <canvas height="270"`+ /* width="270" */`>

        </canvas>
    </div>
    <div class="editor-controls">
        <input class="meme-text" type="text" name="meme-text" placeholder="Type your meme!" oninput="onUpdateText(this)">

        <button class="switch-line" onclick="onSwitchLine()">⇅</button>
        <button class="add-line" onclick="onAddLine()">+</button>
        <button class="remove-line" onclick="onRemoveLine()">🗑</button>

        <button class="increase-font" onclick="onSetFontSize(1)">A+</button>
        <button class="decrease-font" onclick="onSetFontSize(-1)">A-</button>
        <button class="text-align-btn left-align" onclick="onTextAlign('left')">&lt;</button>
        <button class="text-align-btn center-align" onclick="onTextAlign('center')">≡</button>
        <button class="text-align-btn right-align" onclick="onTextAlign('right')">&gt;</button>
        
        <select class="font-face">

        </select>
        <input class="stroke-color" type="color" name="stroke-color" oninput="onSetStrokeColor(this)">
        <input class="fill-color" type="color" name="fill-color" oninput="onSetFillColor(this)">

        <div class="sticker-container"></div>

        <button class="share-btn">Share</button>
    </div>
    `
    elMain.classList.remove('gallery')
    elMain.classList.add('editor', 'main-layout', 'secondary-clr')
    elMain.innerHTML = strHTML;
    // elMain.onload = () => {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    window.addEventListener('resize', onResizeWindow)
    onResizeWindow();
    gCtx.textBaseline = 'middle';
    renderMeme()
    // }
}

function onResizeWindow() {
    if (!checkIfEditorOpen()) return;
    console.log('Resizing!');
    const elCanvasContainer = document.querySelector('.canvas-container');
    const elEditor = document.querySelector('.editor')
    gElCanvas.width = elCanvasContainer.offsetWidth;
    if (window.innerWidth > 510) {
        elEditor.classList.remove('flex-center-column')
        elEditor.classList.add('flex-main')
    } else {
        elEditor.classList.remove('flex-main')
        elEditor.classList.add('flex-center-column')
    }
}

function getCanvasSize() {
    return {
        w: gElCanvas.width,
        h: gElCanvas.height
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
        meme.lines.forEach(line => {
            syncCtxBtnsAndModel(line, false);
            drawText(line);
        })
        if (selectedLine) {
            syncCtxBtnsAndModel(selectedLine, true);
            drawSelectionRectangle(selectedLine);
        }
    }
}

function syncCtxBtnsAndModel(selectedLine, isSyncBtnsOn) {
    if (isSyncBtnsOn) {
        document.querySelector('.meme-text').value = (selectedLine) ? selectedLine.txt : 'Please add line to edit';
        document.querySelector('.stroke-color').value = (selectedLine) ? selectedLine.strokeColor : '#000000';
        document.querySelector('.fill-color').value = (selectedLine) ? selectedLine.fillColor : '#ffffff';
        document.querySelectorAll(`.text-align-btn`).forEach(btn => {
            if (selectedLine && btn.classList.contains(`${selectedLine.align}-align`)) btn.disabled = true;
            else btn.disabled = false;
        })
    }
    gCtx.strokeStyle = selectedLine.strokeColor;
    gCtx.fillStyle = selectedLine.fillColor;
    gCtx.font = `${selectedLine.size}px Arial`;
    gCtx.lineWidth = selectedLine.size / 10;
    // if (alignment) {
    gCtx.textAlign = selectedLine.align;
    // }

}

function drawImg(img/* Url */) {
    // var img = new Image();
    // img.src = imgUrl;
    // img.onload = () => {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    // };
}

function drawText(line) {
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
}

function drawSelectionRectangle(line) {
    const lineMetrics = gCtx.measureText(line.txt);
    const rectW = lineMetrics.width;
    const rectH = Math.abs(lineMetrics.actualBoundingBoxAscent) + Math.abs(lineMetrics.actualBoundingBoxDescent)
    const rectPos = {
        x: line.pos.x - lineMetrics.actualBoundingBoxLeft,
        y: line.pos.y - lineMetrics.actualBoundingBoxAscent
    }
    gCtx.save()
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = 2;
    gCtx.setLineDash([
        rectW * 3 / 20, rectW * 4.5 / 20, rectW * 5 / 20, rectW * 4.5 / 20, rectW * 3 / 20, 0,
        rectH * 3 / 20, rectH * 4.5 / 20, rectH * 5 / 20, rectH * 4.5 / 20, rectH * 3 / 20, 0
    ])
    gCtx.strokeRect(rectPos.x, rectPos.y, rectW, rectH);
    gCtx.restore();
}


function onUpdateText(elTextInput) {
    if (!getMeme().lines.length) return;
    var newText = elTextInput.value;
    setLineText(newText)
    renderMeme()
}

function onSetFontSize(diff) {
    if (!getMeme().lines.length) return;
    setFontSize(diff);
    renderMeme();
}

function onSwitchLine() {
    if (!getMeme().lines.length) return;
    switchLine();
    renderMeme();
}

function onSetStrokeColor(elColorInput) {
    if (!getMeme().lines.length) return;
    setStrokeColor(elColorInput.value);
    renderMeme();
}

function onSetFillColor(elColorInput) {
    if (!getMeme().lines.length) return;
    setFillColor(elColorInput.value);
    renderMeme();
}

function onAddLine() {
    createNewLine()
    renderMeme()
}

function onRemoveLine() {
    if (!getMeme().lines.length) return;
    removeLine();
    renderMeme();
}

function onTextAlign(alignment) {
    if (!getMeme().lines.length) return;
    setTextAlignment(alignment);
    renderMeme();
}

