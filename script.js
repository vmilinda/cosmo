let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');


nextDom.onclick = function(){
    showSlider('next');
}
prevDom.onclick = function(){
    showSlider('prev');
}

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(()=>{
    nextDom.click();
},timeAutoNext);

function showSlider(type){
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if(type === 'next'){
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
    }else{
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() =>{
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning)

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(()=>{
        nextDom.click();
    },timeAutoNext);
}

// slider section 

const wrapper = document.querySelector(".wrapper");
const slider = document.querySelector(".slider");
const firstCardWidth = slider.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const sliderChildrens = [...slider.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the slider at once
let cardPerView = Math.round(slider.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of slider for infinite scrolling
sliderChildrens.slice(-cardPerView).reverse().forEach(card => {
    slider.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of slider for infinite scrolling
sliderChildrens.slice(0, cardPerView).forEach(card => {
    slider.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the slider at appropriate postition to hide first few duplicate cards on Firefox
slider.classList.add("no-transition");
slider.scrollLeft = slider.offsetWidth;
slider.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the slider left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        slider.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    slider.classList.add("dragging");
    // Records the initial cursor and scroll position of the slider
    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the slider based on the cursor movement
    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the slider is at the beginning, scroll to the end
    if(slider.scrollLeft === 0) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.scrollWidth - (2 * slider.offsetWidth);
        slider.classList.remove("no-transition");
    }
    // If the slider is at the end, scroll to the beginning
    else if(Math.ceil(slider.scrollLeft) === slider.scrollWidth - slider.offsetWidth) {
        slider.classList.add("no-transition");
        slider.scrollLeft = slider.offsetWidth;
        slider.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over slider
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the slider after every 2500 ms
    timeoutId = setTimeout(() => slider.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// navbar section 

// const navEl = document.querySelector('.navbar');

// window.addEventListener('scroll', () => {
//     if (window.scrollY >= 56) {
//         navEl.classList.add('navbar-scrolled');
//     } else if (window.scrollY < 56) {
//         navEl.classList.remove('navbar-scrolled');
//     }
// });

// scroll animation 

ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.product, .card-titles, .text-area h1, .heading', { origin: 'top' });
ScrollReveal().reveal('.cardd, .button1', { origin: 'bottom' });
ScrollReveal().reveal('.card-text', { origin: 'left' });


