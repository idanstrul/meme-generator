'use strict'

function renderGallery(){
    const elGalleryMain = document.querySelector('.gallery-main');
    const imgs = getImgs();
    let strHTML = '';
    imgs.forEach(img =>
        strHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    )
    elGalleryMain.innerHTML = strHTML;
}

function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
}