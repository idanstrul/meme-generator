'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elMain = document.querySelector('main')

    let strImgsHTML = '';
    const imgs = getImgs();
    imgs.forEach(img =>
        strImgsHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})">`
    )

    let strMainHTML = `
    <section class="gallery-header main-layout flex-main">
        <div class="inputs">
            <input type="search" placeholder="Enter search keyword">
            <h3> Or upload your own image:<h3>
            <input type="file" class="file-input btn" name="image" onchange="onImgInput(event)" />
        </div>
        <div class="tag-cloud">
            funny politics crazy
        </div>
    </section>
    <section class="gallery-main grid-container main-layout secondary-clr">
        ${strImgsHTML}
    </section>
    <section class="monica-geller hide main-layout">
    
    </section>
    `

    elMain.classList.remove('editor', 'main-layout', 'secondary-clr', 'flex-main', 'flex-center-column')
    elMain.classList.add('gallery')
    elMain.innerHTML = strMainHTML;
}

function onImgSelect(imgId) {
    setImg(imgId)
    setEditorOpen()
    renderEditor()
}

function onOpenGallery(){
    setEditorClosed()
    renderGallery()
}