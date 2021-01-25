// define vars
const menuBtn = document.querySelector('.menu-btn')
const nav = document.querySelector('nav')
let menuOpen = false

/*
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  if(scrollPos > 10){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})
*/

// Register Service Worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('/sw.js')
			.then((res) => console.log('service worker registered'))
			.catch((err) => console.log(err))
	})
}

menuBtn.addEventListener('click', () => {
	if (!menuOpen) {
    menuBtn.classList.add('menu-open')
    nav.classList.add('nav-open')
		menuOpen = true
	} else {
    menuBtn.classList.remove('menu-open')
    nav.classList.remove('nav-open')
		menuOpen = false
	}
})

const observer = new IntersectionObserver(test, {})

function test() {}
