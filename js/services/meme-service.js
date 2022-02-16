'use strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
var gImgs = [{ id: 1, url: '../assets/meme-imgs-square/1.jpg', keywords: ['funny', 'cat'] }];
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