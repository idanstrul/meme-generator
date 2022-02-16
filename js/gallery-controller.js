'use strict'

function renderGallery(){
    const elImagesContainer = document.querySelector('.images-container');
    const imgs = getImgs();
    let strHTML;
    imgs.forEach(img =>
        strHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    )
    elImagesContainer.innerHTML = strHTML;
}

function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
}