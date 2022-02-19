'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: 'assets/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'assets/meme-imgs-square/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'assets/meme-imgs-square/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'assets/meme-imgs-square/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'assets/meme-imgs-square/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'assets/meme-imgs-square/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'assets/meme-imgs-square/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'assets/meme-imgs-square/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'assets/meme-imgs-square/9.jpg', keywords: ['funny', 'cat'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'center',
            fillColor: '#ff0000',
            strokeColor: '#ff0000',
            pos: {
                x: 135,
                y: 30
            }
        },
        {
            txt: 'Jack Ass!',
            size: 30,
            align: 'center',
            fillColor: '#00ff00',
            strokeColor: '#00ff00',
            pos: {
                x: 135,
                y: 240
            }
        }
    ]
}
var gIsEditorOpen = false;

function setEditorOpen() {
    if (gIsEditorOpen) return
    gIsEditorOpen = true;
}

function setEditorClosed() {
    if (!gIsEditorOpen) return
    gIsEditorOpen = false;
}

function checkIfEditorOpen() {
    return gIsEditorOpen
}

function getMeme() {
    return gMeme;
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId)
}

function getImgs() {
    return gImgs;
}

function setLineText(newText) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newText;
}

function setImg(newImgId) {
    gMeme.selectedImgId = newImgId;
}

function setStrokeColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = newColor;
}

function setFillColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = newColor;
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function switchLine() {
    gMeme.selectedLineIdx += 1;
    gMeme.selectedLineIdx %= gMeme.lines.length;
}


function createNewLine() {
    const canvasSize = getCanvasSize()
    var pos;
    if (!gMeme.lines.some(line => line.pos.y < 50)) {
        pos = {
            x: 135,
            y: 30,
        }
    } else if (!gMeme.lines.some(line => line.pos.y > 220)) {
        pos = {
            x: 135,
            y: 240
        }
    } else {
        pos = {
            x: (canvasSize.w / 2 + 3 * gMeme.lines.length) % (canvasSize.w - 80),
            y: (canvasSize.h / 2 - 3 + 3 * gMeme.lines.length) % (canvasSize.h - 10)
        }
    }
    gMeme.lines.push(
        {
            txt: 'Type your meme!',
            size: 20,
            align: 'center',
            fillColor: '#ffffff',
            strokeColor: '#000000',
            pos
        }
    )
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = positiveModulo((gMeme.selectedLineIdx - 1), gMeme.lines.length);
}

function setTextAlignment(alignment) {
    const line =  gMeme.lines[gMeme.selectedLineIdx];
    const canvasWidth = getCanvasSize().w
    var xPos;
    switch (alignment) {
        case 'left':
            xPos = canvasWidth / 20;
            break;
        case 'center':
            xPos = canvasWidth / 2;
            break;
        case 'right':
            xPos = canvasWidth * 19 / 20;
    }

    line.align = alignment;
    line.pos.x = xPos;
}