'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [
    { id: 1, url: '../assets/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: '../assets/meme-imgs-square/2.jpg', keywords: ['funny', 'cat'] }
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
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