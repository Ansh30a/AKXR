// FOR NAVIGATION MENU
const menuBtn = document.querySelector('.menu-btn')
const navigation = document.querySelector('.navigation')

menuBtn.addEventListener('click', (e) => {
    menuBtn.classList.toggle('active')
    navigation.classList.toggle('active')
})

// FOR VIDEO SLIDER
const sliderBtns = document.querySelectorAll('.nav-btn')
const slides = document.querySelectorAll('.video-slide')
const contents = document.querySelectorAll('.content')

var sliderNav = function(manual) {
    sliderBtns.forEach((btn) => {
        btn.classList.remove('active')
    })
    slides.forEach((slide) => {
        slide.classList.remove('active')
    })
    contents.forEach((content) => {
        content.classList.remove('active')
    })

    sliderBtns[manual].classList.add('active')
    slides[manual].classList.add('active')
    contents[manual].classList.add('active')
}

sliderBtns.forEach((sliderBtn, i) => {
    sliderBtn.addEventListener('click', (e) => {
        sliderNav(i)
    })
})