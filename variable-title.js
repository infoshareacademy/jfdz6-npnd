window.onscroll = function () {
    variableTitle()
};

function variableTitle() {

    console.log('scroll top', document.body.scrollTop);

    if (isAbove('features')){
        setTitle('Analizator finansowy');
    } else if (isBelow('features') && isAbove('contact')) {
        setTitle('Funkcje - Analizator finansowy')
    } else if (isBelow('contact') && isAbove('authors')) {
        setTitle('Kontakt - Analizator finansowy')
    } else {
        setTitle('O nas');
    }
}

function isAbove(selector) {
    return document.body.scrollTop <= document.querySelector('#'+selector).offsetTop
}

function isBelow(selector) {
    return document.body.scrollTop > document.querySelector('#'+selector).offsetTop
}

function setTitle(title) {
    document.title = title;
}
