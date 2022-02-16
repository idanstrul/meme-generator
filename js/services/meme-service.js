'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: '../assets/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '../assets/meme-imgs-square/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: '../assets/meme-imgs-square/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: '../assets/meme-imgs-square/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: '../assets/meme-imgs-square/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: '../assets/meme-imgs-square/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: '../assets/meme-imgs-square/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: '../assets/meme-imgs-square/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: '../assets/meme-imgs-square/9.jpg', keywords: ['funny', 'cat'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: '#ff0000'
        },
        {
            txt: 'Jack Ass!',
            size: 30,
            align: 'left',
            color: '#00ff00'
        }
    ]
}

function getMeme(){
    return gMeme;
}

function getImgById(imgId){
    return gImgs.find(img => img.id === imgId)
}

function getImgs(){
    return gImgs;
}

function setLineText(newText){
    gMeme.lines[gMeme.selectedLineIdx].txt = newText;
}

function setImg(newImgId){
    gMeme.selectedImgId = newImgId;
}

function setTextColor(newColor){
    gMeme.lines[gMeme.selectedLineIdx].color = newColor;
}

function setFontSize(diff){
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function switchLine(){
    gMeme.selectedLineIdx += 1;
    gMeme.selectedLineIdx %= gMeme.lines.length;
}